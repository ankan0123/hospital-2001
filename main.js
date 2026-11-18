// Main JavaScript for IRM Fertility & Reproductive Medicine Website

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Nav Toggle & Responsive Menu Handling
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.add('open');
      } else {
        navMenu.classList.remove('open');
      }
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close mobile menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // 2. Main Appointment / Consultation Modal Handling
  const modalOverlay = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const closeModalBtn = modalOverlay ? modalOverlay.querySelector('.modal-close') : null;

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If button has a preferred doctor, pre-select it
      const prefDoc = btn.getAttribute('data-doctor');
      if (prefDoc && modalOverlay) {
        const docSelect = modalOverlay.querySelector('select[name="doctor"]');
        if (docSelect) {
          docSelect.value = prefDoc;
        }
      }
      if (modalOverlay) {
        modalOverlay.classList.add('active');
      }
    });
  });

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Auto-open Doctor Consultation Modal when opening the Home Page
  if (modalOverlay) {
    const currentPath = window.location.pathname.toLowerCase();
    const isHomePage = currentPath.endsWith('index.html') || 
                       currentPath.endsWith('/') || 
                       currentPath.endsWith('project hospit') || 
                       currentPath.endsWith('project hospit/') || 
                       !currentPath.includes('.html');

    if (isHomePage) {
      setTimeout(() => {
        if (!modalOverlay.classList.contains('active')) {
          modalOverlay.classList.add('active');
        }
      }, 1200);
    }
  }

  // 3. Doctor Database for Interactive Profile & Slot Booking Modal
  const doctorData = {
    'dr-ratna': {
      id: 'dr-ratna',
      name: 'Dr. Ratna Chattopadhyay',
      qualification: 'MBBS, MD (AIIMS), DGO, FICOG',
      role: 'Senior Consultant - Reproductive Medicine & IVF',
      exp: '24+ Years Experience',
      rating: '98.6%',
      cases: '6,200+ IVF Cycles',
      image: 'images/team_doctor_1.png',
      opd: 'Mon, Wed, Fri (10:00 AM - 02:00 PM)',
      bio: 'Dr. Ratna Chattopadhyay is a renowned clinical reproductive endocrinologist trained at the All India Institute of Medical Sciences (AIIMS), New Delhi. With over 24 years of clinical mastery, she has pioneered individualized stimulation protocols, recurrent implantation failure immunology, and fertility preservation. She is committed to ethical, evidence-based reproductive care with world-class success benchmarks.',
      slots: ['10:00 AM', '11:15 AM', '12:30 PM', '01:45 PM', '04:30 PM', '05:45 PM']
    },
    'dr-sunita': {
      id: 'dr-sunita',
      name: 'Dr. Sunita Sharma',
      qualification: 'MBBS, MS, DGO, FICOG',
      role: 'Senior IVF Specialist & Clinical Embryologist',
      exp: '18+ Years Experience',
      rating: '97.9%',
      cases: '4,800+ Successful Cycles',
      image: 'images/team_doctor_2.png',
      opd: 'Tue, Thu, Sat (11:00 AM - 03:30 PM)',
      bio: 'Dr. Sunita Sharma brings 18+ years of expertise in clinical embryology, micro-manipulation (ICSI/IMSI), and unexplained infertility. Her research on blastocyst culture and laser-assisted hatching has contributed to landmark pregnancy outcomes in complex maternal-age cases across Eastern India.',
      slots: ['11:00 AM', '12:15 PM', '01:30 PM', '02:45 PM', '05:00 PM', '06:15 PM']
    },
    'dr-shovananda': {
      id: 'dr-shovananda',
      name: 'Dr. Shovananda Kalapahar',
      qualification: 'MBBS, DGO, MRCOG (UK)',
      role: 'Consultant - Reproductive Medicine & Andrology',
      exp: '15+ Years Experience',
      rating: '96.8%',
      cases: '3,900+ Procedures',
      image: 'images/team_doctor_3.png',
      opd: 'Mon, Tue, Thu (02:00 PM - 06:30 PM)',
      bio: 'Dr. Shovananda Kalapahar completed his postgraduate specialization in reproductive medicine in the United Kingdom. He focuses on severe male factor subfertility, TESA/PESA surgical sperm retrieval, and minimally invasive hysteroscopic correction of uterine anomalies.',
      slots: ['02:00 PM', '03:15 PM', '04:30 PM', '05:30 PM', '06:30 PM']
    },
    'dr-meenakshi': {
      id: 'dr-meenakshi',
      name: 'Dr. Meenakshi Karan',
      qualification: 'MBBS, MD, DGO, FMAS',
      role: 'Fertility Specialist & Endoscopic Surgeon',
      exp: '12+ Years Experience',
      rating: '98.2%',
      cases: '3,100+ Procedures',
      image: 'images/team_doctor_4.png',
      opd: 'Wed, Fri, Sat (01:00 PM - 05:00 PM)',
      bio: 'Dr. Meenakshi Karan is a fellowship-trained gynecological endoscopic surgeon and IVF specialist. She is nationally recognized for her work in deep infiltrating endometriosis, ovarian rejuvenation protocols, and gentle low-dose stimulation for PCOS patients.',
      slots: ['01:00 PM', '02:15 PM', '03:30 PM', '04:45 PM', '06:00 PM']
    }
  };

  // 4. Doctor Profile Modal Trigger & Slot Picker
  const docProfileModal = document.getElementById('doctorProfileModal');
  const viewProfileBtns = document.querySelectorAll('.view-doctor-profile-btn');
  let selectedSlotTime = '';

  const renderDoctorProfile = (docKey) => {
    const doc = doctorData[docKey] || doctorData['dr-ratna'];
    if (!docProfileModal) return;

    const avatarEl = docProfileModal.querySelector('#docModalAvatar');
    const nameEl = docProfileModal.querySelector('#docModalName');
    const degEl = docProfileModal.querySelector('#docModalDeg');
    const deptEl = docProfileModal.querySelector('#docModalDept');
    const expEl = docProfileModal.querySelector('#docModalExp');
    const ratingEl = docProfileModal.querySelector('#docModalRating');
    const casesEl = docProfileModal.querySelector('#docModalCases');
    const bioEl = docProfileModal.querySelector('#docModalBio');
    const opdEl = docProfileModal.querySelector('#docModalOpd');
    const slotsContainer = docProfileModal.querySelector('#docModalSlots');
    const hiddenDocInput = docProfileModal.querySelector('#docModalHiddenDoctor');

    if (avatarEl) avatarEl.src = doc.image;
    if (nameEl) nameEl.textContent = doc.name;
    if (degEl) degEl.textContent = doc.qualification;
    if (deptEl) deptEl.textContent = doc.role;
    if (expEl) expEl.textContent = doc.exp;
    if (ratingEl) ratingEl.textContent = doc.rating;
    if (casesEl) casesEl.textContent = doc.cases;
    if (bioEl) docBioHtml = `<p>${doc.bio}</p>`;
    if (bioEl) bioEl.innerHTML = doc.bio;
    if (opdEl) opdEl.textContent = doc.opd;
    if (hiddenDocInput) hiddenDocInput.value = doc.name;

    // Render slot time chips
    if (slotsContainer) {
      slotsContainer.innerHTML = '';
      selectedSlotTime = doc.slots[0] || '10:00 AM';
      const slotInput = docProfileModal.querySelector('#docModalHiddenSlot');
      if (slotInput) slotInput.value = selectedSlotTime;

      doc.slots.forEach((slot, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `slot-time-btn ${index === 0 ? 'active' : ''}`;
        btn.innerHTML = `<span>${slot}</span><small>Available</small>`;
        btn.addEventListener('click', () => {
          docProfileModal.querySelectorAll('.slot-time-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedSlotTime = slot;
          if (slotInput) slotInput.value = slot;
        });
        slotsContainer.appendChild(btn);
      });
    }

    docProfileModal.classList.add('active');
  };

  viewProfileBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docKey = btn.getAttribute('data-doctor-id') || 'dr-ratna';
      renderDoctorProfile(docKey);
    });
  });

  if (docProfileModal) {
    const closeDocBtn = docProfileModal.querySelector('.modal-close');
    if (closeDocBtn) {
      closeDocBtn.addEventListener('click', () => {
        docProfileModal.classList.remove('active');
      });
    }
    docProfileModal.addEventListener('click', (e) => {
      if (e.target === docProfileModal) {
        docProfileModal.classList.remove('active');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && docProfileModal.classList.contains('active')) {
        docProfileModal.classList.remove('active');
      }
    });
  }

  // 5. Animated Counter Increase on Scroll (IntersectionObserver)
  const counterElements = document.querySelectorAll('.counter-num');
  if (counterElements.length > 0) {
    const runCounterAnimation = (el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = parseInt(el.getAttribute('data-duration') || '1800', 10);
      const isInteger = Number.isInteger(target);
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out exponential curve for smooth deceleration
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = target * easeOut;

        const formatted = isInteger 
          ? Math.floor(currentVal).toLocaleString() 
          : currentVal.toFixed(1);

        el.innerText = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.innerText = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounterAnimation(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 7. Category Filter Chips (Services & Blog)
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter');
      const filterableCards = document.querySelectorAll('.filterable-card');

      filterableCards.forEach(card => {
        if (!filterVal || filterVal === 'all') {
          card.style.display = 'flex';
        } else {
          const category = card.getAttribute('data-category');
          if (category && (category === filterVal || category.includes(filterVal))) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // 8. Blog Search Filter
  const blogSearchInput = document.getElementById('blogSearchInput');
  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const blogCards = document.querySelectorAll('.blog-card');

      blogCards.forEach(card => {
        const title = card.querySelector('.blog-card-title')?.innerText.toLowerCase() || '';
        const excerpt = card.querySelector('.blog-card-excerpt')?.innerText.toLowerCase() || '';
        const tag = card.querySelector('.blog-badge-tag')?.innerText.toLowerCase() || '';

        if (title.includes(term) || excerpt.includes(term) || tag.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 9. Form Submission Handling (with Doctor & Remarks Support)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Confirming Booking...';
      }

      // Collect data summary for friendly confirmation
      const formData = new FormData(form);
      const doctorName = formData.get('doctor') || 'Senior IVF Consultant';
      const patientName = formData.get('name') || 'Valued Patient';
      const slotTime = formData.get('slot_time') || '';
      const notes = formData.get('notes') || '';

      setTimeout(() => {
        let msg = `Thank you, ${patientName}! Your consultation with ${doctorName} has been recorded.`;
        if (slotTime) {
          msg += ` Preferred Slot: ${slotTime}.`;
        }
        if (notes) {
          msg += ` Your remarks have been forwarded to the medical team.`;
        }
        msg += ` Our clinical coordinator will call you within 15 minutes.`;
        
        alert(msg);
        form.reset();

        if (modalOverlay) modalOverlay.classList.remove('active');
        if (docProfileModal) docProfileModal.classList.remove('active');

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }, 700);
    });
  });
});
