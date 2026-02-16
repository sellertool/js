/**
 * Modern center-of-page notice – Holiday Notice
 * Usage: HolidayNotice.show('Your holiday notice message');
 */

(function () {
  'use strict';

  const defaultOptions = {
    title: 'Holiday Notice',
    message: '',
    duration: 0,        // 0 = no auto-close, manual close only
    showClose: true,
    theme: 'info',      // info | success | warning
  };

  const themes = {
    info: {
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '📢',
    },
    success: {
      bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      icon: '✅',
    },
    warning: {
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '⚠️',
    },
  };

  function createStyles() {
    if (document.getElementById('holiday-notice-styles')) return;
    const style = document.createElement('style');
    style.id = 'holiday-notice-styles';
    style.textContent = `
      .hn-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        pointer-events: none;
      }
      .hn-overlay * {
        box-sizing: border-box;
      }
      .hn-box {
        max-width: 740px;
        width: 100%;
        padding: 18px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset;
        color: #fff;
        display: flex;
        align-items: flex-start;
        gap: 16px;
        pointer-events: auto;
        animation: hn-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes hn-pop-in {
        from {
          opacity: 0;
          transform: scale(0.92);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      .hn-box.hn-hiding {
        animation: hn-pop-out 0.3s ease forwards;
      }
      @keyframes hn-pop-out {
        to {
          opacity: 0;
          transform: scale(0.92);
        }
      }
      .hn-icon {
        font-size: 28px;
        line-height: 1;
        flex-shrink: 0;
      }
      .hn-body {
        flex: 1;
        min-width: 0;
      }
      .hn-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 6px 0;
        letter-spacing: 0.02em;
      }
      .hn-message {
        font-size: 14px;
        line-height: 1.5;
        margin: 0;
        opacity: 0.95;
        white-space: pre-line;
      }
      .hn-close {
        width: 32px;
        height: 32px;
        border: none;
        background: rgba(255,255,255,0.2);
        color: #fff;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background 0.2s;
        font-size: 18px;
        line-height: 1;
      }
      .hn-close:hover {
        background: rgba(255,255,255,0.35);
      }
      .hn-close:active {
        transform: scale(0.96);
      }
    `;
    document.head.appendChild(style);
  }

  function hide(el, overlay, callback) {
    if (!el || el.classList.contains('hn-hiding')) return;
    el.classList.add('hn-hiding');
    setTimeout(() => {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (typeof callback === 'function') callback();
    }, 300);
  }

  window.HolidayNotice = {
    show(message, options = {}) {
      const opts = { ...defaultOptions, ...options };
      if (typeof message === 'string') opts.message = message;
      else if (message && typeof message === 'object') Object.assign(opts, message);

      createStyles();

      const theme = themes[opts.theme] || themes.info;
      const overlay = document.createElement('div');
      overlay.className = 'hn-overlay';

      const box = document.createElement('div');
      box.className = 'hn-box';
      box.style.background = theme.bg;

      box.innerHTML = `
        <span class="hn-icon" aria-hidden="true">${theme.icon}</span>
        <div class="hn-body">
          <p class="hn-title">${escapeHtml(opts.title)}</p>
          <p class="hn-message">${escapeHtml(opts.message)}</p>
        </div>
        ${opts.showClose ? '<button type="button" class="hn-close" aria-label="Close">×</button>' : ''}
      `;

      overlay.appendChild(box);
      document.body.appendChild(overlay);

      const closeBtn = box.querySelector('.hn-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => hide(box, overlay, opts.onClose));
      }

      if (opts.duration > 0) {
        setTimeout(() => hide(box, overlay, opts.onClose), opts.duration);
      }

      return {
        close() {
          hide(box, overlay, opts.onClose);
        },
      };
    },
  };

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Show default holiday notice on page load
  function showDefault() {
    HolidayNotice.show({
      title: 'Chinese New Year Holiday Notice & Customer Service Arrangements',
      message: 'Dear Valued Customers,\n\n'
        + 'Please be advised that our office will be closed in observance of the Chinese New Year (Spring Festival) from February 15, 2026 to February 23, 2026. Normal business operations will resume on February 24, 2026.\n\n'
        + '🚚 Shipping & Logistics Suspension:\n'
        + 'Due to the nationwide holiday and carrier closures, all shipping and delivery services will be temporarily suspended during the above period. Orders placed during this time will be processed and shipped once logistics resume. Please expect possible delays in transit.\n\n'
        + '💬 Customer Service Availability:\n'
        + 'While our office is closed, we will have limited customer service support available online. Our agents will do their best to assist you, but please note that response times may be slower than usual due to the holiday.\n\n'
        + 'We appreciate your understanding and patience during this festive season. Thank you for your continued support, and we wish you and your family a prosperous Year of the Horse!\n\n'
        + 'Best regards,\n'
        + 'VIPservice Team',
      theme: 'info',
      showClose: true
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showDefault);
  } else {
    showDefault();
  }
})();
