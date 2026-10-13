import AxeBuilder from '@axe-core/playwright';
import { test as base, expect } from '@playwright/test';

const GITHUB = 'https://github.com/advansahiti70-oss';
const INSTAGRAM = 'https://www.instagram.com/advan66/';
const PROJECT = 'https://twomindsdev.com/';

/** Every test also fails on uncaught errors or console errors. */
const test = base.extend({
  page: async ({ page }, use) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await use(page);
    expect(errors, 'console and page errors').toEqual([]);
  },
});

/** Waits until a section's top edge has settled just below the fixed header. */
async function expectSectionAtTop(page, id) {
  await expect
    .poll(() => page.locator(`#${id}`).evaluate((el) => Math.round(el.getBoundingClientRect().top)), {
      message: `#${id} scrolled to the top of the viewport`,
    })
    .toBeGreaterThanOrEqual(-2);
  await expect
    .poll(() => page.locator(`#${id}`).evaluate((el) => Math.round(el.getBoundingClientRect().top)))
    .toBeLessThanOrEqual(130);
}

test.describe('content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('uses the name Advan Sahiti in metadata, navigation, hero and footer', async ({ page }) => {
    await expect(page).toHaveTitle(/Advan Sahiti/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Advan Sahiti/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Advan Sahiti/);
    await expect(page.getByRole('link', { name: 'Advan Sahiti, back to top' })).toBeVisible();
    await expect(page.locator('.hero__lede')).toContainText('I’m Advan Sahiti');
    await expect(page.locator('.site-footer')).toContainText('Advan Sahiti');
  });

  test('shows the hero, about and contact copy', async ({ page }) => {
    await expect(page.locator('.hero__eyebrow')).toHaveText('Web Developer · Digital Creator');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Digital ideas, built with purpose.');
    await expect(page.locator('.hero__lede')).toHaveText(
      'I’m Advan Sahiti — creating modern web experiences, crafting thoughtful interfaces, and exploring what’s possible with AI.',
    );
    await expect(page.getByRole('heading', { level: 2, name: 'Beyond the code.' })).toBeVisible();
    await expect(page.locator('.about__lead')).toContainText(
      'I’m Advan, a developer interested in turning ideas into digital experiences that look thoughtful, feel intuitive, and work smoothly.',
    );
    await expect(page.getByRole('heading', { level: 2, name: 'Have an idea? Let’s build it.' })).toBeVisible();
    await expect(page.locator('.contact__copy')).toHaveText(
      'Whether you’re thinking about a website, a new digital experience, or an AI-powered idea, let’s start a conversation.',
    );
  });

  test('lists every skill without invented proficiency levels', async ({ page }) => {
    const expertise = page.locator('#expertise');
    for (const skill of [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'AI-powered applications',
      'AI integration',
      'Intelligent digital experiences',
    ]) {
      await expect(expertise.getByText(skill, { exact: true })).toHaveCount(1);
    }
    await expect(expertise).not.toContainText('%');
    await expect(page.locator('body')).not.toContainText(/UI\s*\/\s*UX/i);
    await expect(expertise.locator('progress, [role="progressbar"], meter')).toHaveCount(0);
  });

  test('presents TwoMindsDev as the only project, honestly labelled', async ({ page }) => {
    await expect(page.locator('article.case')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 3, name: 'TwoMindsDev' })).toBeVisible();
    await expect(page.locator('.case__description')).toHaveText(
      'TwoMindsDev is a web development brand focused on creating professional websites that help businesses strengthen their online presence and grow digitally.',
    );
    await expect(page.locator('.preview__caption')).toContainText('Illustrative preview');
    await expect(page.getByRole('link', { name: /View Live Project/ })).toHaveAttribute('href', PROJECT);
  });

  test('does not invent an email address or a contact form', async ({ page }) => {
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator('form')).toHaveCount(0);
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
  });
});

test.describe('links', () => {
  test('external links use the exact URLs and open safely in a new tab', async ({ page }) => {
    await page.goto('/');
    const external = page.locator('a[target="_blank"]');
    const count = await external.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      const link = external.nth(i);
      expect([GITHUB, INSTAGRAM, PROJECT]).toContain(await link.getAttribute('href'));
      const rel = (await link.getAttribute('rel')).split(/\s+/);
      expect(rel).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
    }

    // Social links appear in the about/contact area and in the footer.
    await expect(page.locator(`a[href="${GITHUB}"]`)).not.toHaveCount(0);
    await expect(page.locator(`.site-footer a[href="${GITHUB}"]`)).toHaveCount(1);
    await expect(page.locator(`.site-footer a[href="${INSTAGRAM}"]`)).toHaveCount(1);
    await expect(page.locator(`#contact a[href="${GITHUB}"]`)).toHaveCount(1);
    await expect(page.locator(`#contact a[href="${INSTAGRAM}"]`)).not.toHaveCount(0);

    const firstGithub = page.locator('main').getByRole('link', { name: /View My GitHub/ }).first();
    await expect(firstGithub).toHaveAttribute('href', GITHUB);
    const firstInstagram = page.locator('main').getByRole('link', { name: /Follow Me on Instagram/ }).first();
    await expect(firstInstagram).toHaveAttribute('href', INSTAGRAM);
  });

  test('hero calls to action scroll to the project and the biography', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Explore My Work' }).click();
    await expectSectionAtTop(page, 'projects');
    await expect(page).toHaveURL(/#projects$/);

    await page.goto('/');
    await page.getByRole('link', { name: 'About Me' }).click();
    await expectSectionAtTop(page, 'about');
    await expect(page).toHaveURL(/#about$/);
  });
});

test.describe('desktop navigation', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop navigation only');

  test('each item scrolls to its section and is marked current', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });

    for (const [label, id] of [
      ['About', 'about'],
      ['Expertise', 'expertise'],
      ['Projects', 'projects'],
      ['Contact', 'contact'],
      ['Home', 'home'],
    ]) {
      const link = nav.getByRole('link', { name: label });
      await link.click();
      await expectSectionAtTop(page, id);
      await expect(link).toHaveAttribute('aria-current', 'true');
    }
  });

  test('“Let’s Talk” goes to the contact section and the header compacts on scroll', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header.nav');
    await expect(header).not.toHaveAttribute('data-scrolled');
    await page.locator('header').getByRole('link', { name: 'Let’s Talk' }).click();
    await expectSectionAtTop(page, 'contact');
    await expect(header).toHaveAttribute('data-scrolled', 'true');
  });
});

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile menu only');

  test('opens, makes the page inert, and closes with Escape', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('.nav__toggle');
    const menu = page.locator('#mobile-menu');

    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAccessibleName('Close');
    await expect(menu).toBeVisible();
    await expect(page.locator('#main')).toHaveJSProperty('inert', true);
    await expect(menu.getByRole('link', { name: /Home/ })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await expect(page.locator('#main')).toHaveJSProperty('inert', false);
  });

  test('links close the menu and scroll to the section', async ({ page }) => {
    await page.goto('/');
    for (const [label, id] of [
      ['Projects', 'projects'],
      ['Expertise', 'expertise'],
      ['Contact', 'contact'],
      ['About', 'about'],
    ]) {
      await page.locator('.nav__toggle').click();
      await page.locator('#mobile-menu').getByRole('link', { name: new RegExp(label) }).click();
      await expect(page.locator('#mobile-menu')).toBeHidden();
      await expectSectionAtTop(page, id);
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
    }
  });
});

test.describe('layout and accessibility', () => {
  test('has no horizontal overflow', async ({ page }) => {
    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
    }
  });

  test('has no detectable WCAG A/AA violations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('the skip link moves focus to the main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('turns entrance and drift animations off for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const animation = await page.locator('.hero__line > span').first().evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe('none');

    // The wave figure is drawn once and then stays still.
    const path = page.locator('.wavefield__line').first();
    const before = await path.getAttribute('d');
    await page.waitForTimeout(400);
    expect(await path.getAttribute('d')).toBe(before);
    expect(before).toMatch(/^M0 /);
  });
});
