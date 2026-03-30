gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  setupImageFallbacks();

  initHeadline();
  initStats();
  initCarScroll();
  initHeroPin();
});

function setupImageFallbacks() {
  const primaryImg = document.querySelector('.car-img-primary');
  const backupImg = document.querySelector('.car-img-backup');
  const svgFallback = document.querySelector('.car-svg-fallback');
  
  primaryImg.onerror = function() {
    primaryImg.style.opacity = '0';
    backupImg.style.opacity = '1';
    backupImg.onerror = function() {
      backupImg.style.opacity = '0';
      svgFallback.style.opacity = '1';
    };
  };
  const img1 = new Image();
  img1.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80';
}

function initHeadline() {
  gsap.from('.hero-headline h1, .hero-headline h2', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.3
  });
}

function initStats() {
  const counters = document.querySelectorAll('.stat-counter');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    gsap.to(counter, {
      innerHTML: target,
      duration: 2.5,
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        end: 'bottom 50%',
        scrub: true
      },
      ease: 'power2.out',
      onUpdate: function() {
        const value = Math.ceil(this.targets()[0].innerHTML);
        counter.innerHTML = value > target ? target.toLocaleString() : value;
      }
    });
  });
}

function initCarScroll() {
  gsap.to('.car-container', {
    y: '-25%',
    scale: 1.12,
    rotationY: 8,
    rotationX: -5,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    }
  });
  
  gsap.to('.car-img-primary', {
    scale: 1.08,
    brightness: 1.25,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}

function initHeroPin() {
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: '+=150%',
    pin: true,
    pinSpacing: true
  });
}

document.querySelector('.car-container').addEventListener('mousemove', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  
  gsap.to('.car-img-primary', {
    rotationY: (x - 0.5) * 10,
    rotationX: (0.5 - y) * 10,
    duration: 1,
    ease: 'power2.out'
  });
});