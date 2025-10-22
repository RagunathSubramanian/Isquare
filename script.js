$(document).ready(function() {
    // Mobile Navigation Toggle
    $('.hamburger').click(function() {
        $('.nav-menu').toggleClass('active');
        $('.hamburger').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').click(function() {
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
    });

    // Smooth scrolling for navigation links
    $('.nav-link').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if (target.startsWith('#')) {
            var targetSection = $(target);
            if (targetSection.length) {
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 70
                }, 800);
            }
        }
    });

    // Smooth scrolling for buttons
    $('.btn').click(function(e) {
        var href = $(this).attr('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            var targetSection = $(href);
            if (targetSection.length) {
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 70
                }, 800);
            }
        }
    });

    // Navbar background change on scroll
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Add scrolled class styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .navbar.scrolled {
                background: rgba(255, 255, 255, 0.98);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            }
        `)
        .appendTo('head');

    // Animate elements on scroll
    function animateOnScroll() {
        $('.service-card, .stat, .contact-item').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in-up');
            }
        });
    }

    // Run animation on scroll
    $(window).scroll(animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Contact form validation and submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        var formData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            service: $('#service').val(),
            message: $('#message').val().trim()
        };

        // Validation
        var errors = [];
        
        if (!formData.name) {
            errors.push('Name is required');
        }
        
        if (!formData.email) {
            errors.push('Email is required');
        } else if (!isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.service) {
            errors.push('Please select a service');
        }
        
        if (!formData.message) {
            errors.push('Message is required');
        }

        // Show errors if any
        if (errors.length > 0) {
            showNotification('Please fix the following errors:\n' + errors.join('\n'), 'error');
            return;
        }

        // Simulate form submission
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });

    // Email validation function
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        $('.notification').remove();
        
        var notificationClass = type === 'error' ? 'notification-error' : 'notification-success';
        var icon = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
        
        var notification = $(`
            <div class="notification ${notificationClass}">
                <i class="${icon}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Show notification with animation
        setTimeout(function() {
            notification.addClass('show');
        }, 100);
        
        // Auto hide after 5 seconds
        setTimeout(function() {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.find('.notification-close').click(function() {
            hideNotification(notification);
        });
    }

    function hideNotification(notification) {
        notification.removeClass('show');
        setTimeout(function() {
            notification.remove();
        }, 300);
    }

    // Add notification styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 400px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                border-left: 4px solid var(--primary-orange);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left-color: #28a745;
            }
            
            .notification-error {
                border-left-color: #dc3545;
            }
            
            .notification i {
                font-size: 1.2rem;
            }
            
            .notification-success i {
                color: #28a745;
            }
            
            .notification-error i {
                color: #dc3545;
            }
            
            .notification span {
                flex: 1;
                white-space: pre-line;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: #333;
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `)
        .appendTo('head');

    // Counter animation for stats
    function animateCounters() {
        $('.stat h3').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count') || parseInt($this.text().replace(/[^\d]/g, ''));
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    var suffix = $this.text().replace(/[\d]/g, '');
                    $this.text(Math.floor(this.countNum) + suffix);
                },
                complete: function() {
                    var suffix = $this.text().replace(/[\d]/g, '');
                    $this.text(countTo + suffix);
                }
            });
        });
    }

    // Trigger counter animation when stats section is visible
    $(window).scroll(function() {
        var statsSection = $('.about-stats');
        var statsTop = statsSection.offset().top;
        var statsBottom = statsTop + statsSection.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (statsBottom > viewportTop && statsTop < viewportBottom) {
            if (!statsSection.hasClass('animated')) {
                statsSection.addClass('animated');
                animateCounters();
            }
        }
    });

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var parallax = $('.hero');
        var speed = scrolled * 0.5;
        
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Add loaded class styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
        `)
        .appendTo('head');

    // Form field focus effects
    $('input, select, textarea').focus(function() {
        $(this).parent().addClass('focused');
    }).blur(function() {
        $(this).parent().removeClass('focused');
    });

    // Add focused class styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .form-group.focused input,
            .form-group.focused select,
            .form-group.focused textarea {
                border-color: var(--primary-orange);
                box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
            }
        `)
        .appendTo('head');

    // Smooth reveal animation for sections
    function revealSections() {
        $('section').each(function() {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (sectionBottom > viewportTop && sectionTop < viewportBottom) {
                $(this).addClass('revealed');
            }
        });
    }

    $(window).scroll(revealSections);
    revealSections(); // Run once on page load

    // Add revealed class styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            section {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            section.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .hero {
                opacity: 1;
                transform: none;
            }
        `)
        .appendTo('head');
});
