const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzZuaLiGcWtfcYb70gT2IW8AMOfyTGwAFg_7S8yVobeGCsvOSTimlzRyXaPHoK8Cj_T/exec";

function initMobileMenu() {
  const toggleButton = document.querySelector("[data-mobile-menu-button]");
  const menu = document.getElementById("mobile-menu");
  if (!toggleButton || !menu) return;

  const menuIcon = toggleButton.querySelector('[data-icon="menu"]');
  const closeIcon = toggleButton.querySelector('[data-icon="close"]');

  const setOpen = open => {
    toggleButton.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("hidden", !open);
    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle("hidden", open);
      closeIcon.classList.toggle("hidden", !open);
    }
  };

  toggleButton.addEventListener("click", () => {
    const isOpen = toggleButton.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  menu.querySelectorAll("[data-close-mobile-menu]").forEach(link => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function initPersonaTabs() {
  const buttons = document.querySelectorAll("[data-persona-button]");
  const panels = document.querySelectorAll("[data-persona-panel]");
  if (!buttons.length || !panels.length) return;

  const setActive = id => {
    buttons.forEach(button => {
      const isActive = button.getAttribute("data-persona-button") === id;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("bg-primary", isActive);
      button.classList.toggle("text-primary-foreground", isActive);
      button.classList.toggle("border", !isActive);
      button.classList.toggle("bg-transparent", !isActive);
      button.classList.toggle("shadow-xs", !isActive);
    });
    panels.forEach(panel => {
      const isActive = panel.getAttribute("data-persona-panel") === id;
      panel.classList.toggle("hidden", !isActive);
    });
  };

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-persona-button");
      if (id) {
        setActive(id);
      }
    });
  });

  const initialButton =
    document.querySelector("[data-persona-button][aria-pressed='true']") ||
    buttons[0];
  if (initialButton) {
    const initialId = initialButton.getAttribute("data-persona-button");
    if (initialId) {
      setActive(initialId);
    }
  }
}

function initSmoothScroll() {
  document.querySelectorAll("[data-scroll-target]").forEach(trigger => {
    trigger.addEventListener("click", event => {
      const target = trigger.getAttribute("data-scroll-target");
      if (!target) return;
      event.preventDefault();
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function showStatus(statusEl, message, type) {
  if (!statusEl) return;
  const baseClasses = "mb-6 rounded-lg border px-4 py-3 text-sm";
  const palette = {
    success: "bg-emerald-50 text-emerald-900 border-emerald-200",
    error: "bg-destructive/10 text-destructive border-destructive/20",
  };
  statusEl.textContent = message;
  statusEl.className = `${baseClasses} ${palette[type] || ""}`.trim();
  statusEl.classList.remove("hidden");
}

function hideStatus(statusEl) {
  if (!statusEl) return;
  statusEl.classList.add("hidden");
}

function serializeForm(form) {
  const formData = new FormData(form);
  return {
    name: formData.get("name")?.toString().trim() || "",
    whatsapp: formData.get("whatsapp")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    telegram: formData.get("telegram")?.toString().trim() || "",
    teachingFormat: formData.get("teachingFormat")?.toString() || "",
    weeklyHours: formData.get("weeklyHours")?.toString() || "",
    commuteHours: formData.get("commuteHours")?.toString() || "",
    biggestPain: formData.get("biggestPain")?.toString() || "",
    subjects: formData.get("subjects")?.toString().trim() || "",
    optionalNotes: formData.get("optionalNotes")?.toString().trim() || "",
    interviewOptIn: formData.get("interviewOptIn") === "on",
    willingnessToPayOptIn: formData.get("willingnessToPayOptIn") === "on",
    receiveUpdates: formData.get("receiveUpdates") === "on",
  };
}

function validateFormPayload(payload, statusEl) {
  const hasContact = Boolean(payload.whatsapp || payload.email);
  if (!payload.name || !hasContact) {
    showStatus(
      statusEl,
      "Please provide your name and at least one contact method (WhatsApp or Email).",
      "error"
    );
    return false;
  }
  return true;
}

function toggleSubmitting(button, isSubmitting) {
  if (!button) return;
  button.disabled = isSubmitting;
  button.textContent = isSubmitting ? "Submitting..." : "Join Founding Cohort";
}

function toggleSuccessState(form, successEl, isSuccess) {
  if (!form || !successEl) return;
  form.classList.toggle("hidden", isSuccess);
  successEl.classList.toggle("hidden", !isSuccess);
}

function initJoinForm() {
  const form = document.getElementById("join-form");
  if (!form) return;
  const statusEl = document.getElementById("form-status");
  const successEl = document.getElementById("join-success");
  const submitButton = document.getElementById("join-submit");
  let resetTimer;

  form.addEventListener("submit", async event => {
    event.preventDefault();
    hideStatus(statusEl);
    const payload = serializeForm(form);
    if (!validateFormPayload(payload, statusEl)) return;

    toggleSubmitting(submitButton, true);

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      showStatus(
        statusEl,
        "Thank you! We'll be in touch within 48 hours.",
        "success"
      );
      toggleSuccessState(form, successEl, true);
      form.reset();

      clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        toggleSuccessState(form, successEl, false);
        hideStatus(statusEl);
      }, 3000);
    } catch (error) {
      console.error(error);
      showStatus(statusEl, "Something went wrong. Please try again.", "error");
    } finally {
      toggleSubmitting(submitButton, false);
    }
  });
}

function init() {
  initMobileMenu();
  initPersonaTabs();
  initSmoothScroll();
  initJoinForm();
}

document.addEventListener("DOMContentLoaded", init);
