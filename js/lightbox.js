        // ===== Lightbox =====
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const zoomLevel = document.getElementById('zoomLevel');

        let currentZoom = 1;
        const MIN_ZOOM = 1;
        const MAX_ZOOM = 4;
        const ZOOM_STEP = 1;
        let translateX = 0;
        let translateY = 0;
        let isDragging = false;
        let suppressClick = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let startTranslateX = 0;
        let startTranslateY = 0;
        let clickTimer = null;
        let lastTapTime = 0;
        let tapMoved = false;
        let tapStartX = 0;
        let tapStartY = 0;
        let suppressClickTimer = null;

        function clearSuppressClick() {
            if (suppressClickTimer) {
                clearTimeout(suppressClickTimer);
                suppressClickTimer = null;
            }
            suppressClick = false;
        }

        function setSuppressClick() {
            suppressClick = true;
            if (suppressClickTimer) {
                clearTimeout(suppressClickTimer);
            }
            suppressClickTimer = setTimeout(function () {
                suppressClickTimer = null;
                suppressClick = false;
            }, 500);
        }

        function openLightbox(src, index) {
            lightboxImg.src = src;
            lightboxImg.alt = 'Imagine ' + index;
            clearSuppressClick();
            lastTapTime = 0;
            // Reset zoom without inline transform so the CSS scale animation plays
            currentZoom = 1;
            translateX = 0;
            translateY = 0;
            lightboxImg.style.transform = '';
            zoomLevel.textContent = '100%';
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox(event) {
            if (event) {
                event.stopPropagation();
            }
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
            // Reset zoom after the fade-out completes
            setTimeout(function () {
                resetZoom();
            }, 300);
        }

        function applyZoom() {
            lightboxImg.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + currentZoom + ')';
            lightboxImg.style.cursor = currentZoom > 1 ? 'grab' : 'zoom-in';
            zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
        }

        function clampTranslation() {
            const maxOffset = (currentZoom - 1) * 300;
            translateX = Math.max(-maxOffset, Math.min(maxOffset, translateX));
            translateY = Math.max(-maxOffset, Math.min(maxOffset, translateY));
        }

        function zoomLightbox(direction) {
            const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, currentZoom + direction * ZOOM_STEP));
            if (newZoom === currentZoom) return;
            currentZoom = newZoom;
            clampTranslation();
            applyZoom();
        }

        function resetZoom() {
            currentZoom = 1;
            translateX = 0;
            translateY = 0;
            applyZoom();
        }

        // Click on image to zoom in (cycles back to 1x at max)
        lightboxImg.addEventListener('click', function (event) {
            event.stopPropagation();
            if (suppressClick) {
                clearSuppressClick();
                return;
            }
            if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
                // This is the second click of a double-click → just reset zoom
                return;
            }
            clickTimer = setTimeout(function () {
                clickTimer = null;
                if (currentZoom < MAX_ZOOM) {
                    zoomLightbox(1);
                } else {
                    resetZoom();
                }
            }, 250);
        });

        // Double-click to reset zoom
        lightboxImg.addEventListener('dblclick', function (event) {
            event.stopPropagation();
            if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
            }
            resetZoom();
        });

        // Scroll wheel to zoom
        lightboxImg.addEventListener('wheel', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const direction = event.deltaY < 0 ? 1 : -1;
            zoomLightbox(direction);
        }, { passive: false });

        // Mouse drag to pan
        lightboxImg.addEventListener('mousedown', function (event) {
            if (currentZoom <= 1) return;
            event.preventDefault();
            isDragging = true;
            suppressClick = false;
            dragStartX = event.clientX;
            dragStartY = event.clientY;
            startTranslateX = translateX;
            startTranslateY = translateY;
            lightboxImg.style.cursor = 'grabbing';
            lightboxImg.classList.add('no-transition');
        });

        document.addEventListener('mousemove', function (event) {
            if (!isDragging) return;
            translateX = startTranslateX + (event.clientX - dragStartX);
            translateY = startTranslateY + (event.clientY - dragStartY);
            clampTranslation();
            applyZoom();
        });

        document.addEventListener('mouseup', function (event) {
            if (isDragging) {
                isDragging = false;
                const moved = Math.abs(event.clientX - dragStartX) + Math.abs(event.clientY - dragStartY);
                if (moved > 8) {
                    setSuppressClick();
                }
                lightboxImg.classList.remove('no-transition');
                applyZoom();
            }
        });

        // Touch support (pinch zoom + drag)
        let touchStartDist = 0;
        let touchStartZoom = 1;
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTranslateX = 0;
        let touchStartTranslateY = 0;

        lightboxImg.addEventListener('touchstart', function (event) {
            event.stopPropagation();
            if (event.touches.length === 1) {
                tapMoved = false;
                tapStartX = event.touches[0].clientX;
                tapStartY = event.touches[0].clientY;
                if (currentZoom > 1) {
                    isDragging = true;
                    touchStartX = event.touches[0].clientX;
                    touchStartY = event.touches[0].clientY;
                    touchStartTranslateX = translateX;
                    touchStartTranslateY = translateY;
                    lightboxImg.classList.add('no-transition');
                }
            } else if (event.touches.length === 2) {
                clearSuppressClick();
                isDragging = false;
                const dx = event.touches[0].clientX - event.touches[1].clientX;
                const dy = event.touches[0].clientY - event.touches[1].clientY;
                touchStartDist = Math.sqrt(dx * dx + dy * dy);
                touchStartZoom = currentZoom;
            }
        }, { passive: true });

        lightboxImg.addEventListener('touchmove', function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.touches.length === 1) {
                if (Math.abs(event.touches[0].clientX - tapStartX) > 8 ||
                    Math.abs(event.touches[0].clientY - tapStartY) > 8) {
                    tapMoved = true;
                }
                if (isDragging) {
                    translateX = touchStartTranslateX + (event.touches[0].clientX - touchStartX);
                    translateY = touchStartTranslateY + (event.touches[0].clientY - touchStartY);
                    clampTranslation();
                    applyZoom();
                }
            } else if (event.touches.length === 2) {
                tapMoved = true;
                const dx = event.touches[0].clientX - event.touches[1].clientX;
                const dy = event.touches[0].clientY - event.touches[1].clientY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (touchStartDist > 0) {
                    currentZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, touchStartZoom * (dist / touchStartDist)));
                    clampTranslation();
                    applyZoom();
                }
            }
        }, { passive: false });

        lightboxImg.addEventListener('touchend', function (event) {
            if (event.touches.length === 0) {
                isDragging = false;
                lightboxImg.classList.remove('no-transition');
                applyZoom();

                if (tapMoved) {
                    setSuppressClick();
                    return;
                }

                const now = Date.now();
                if (now - lastTapTime < 300) {
                    // Double tap → reset zoom
                    setSuppressClick();
                    lastTapTime = 0;
                    resetZoom();
                    return;
                }
                lastTapTime = now;

                // Prevent the synthetic click event that follows from also zooming
                setSuppressClick();

                if (currentZoom < MAX_ZOOM) {
                    zoomLightbox(1);
                } else {
                    resetZoom();
                }
            }
        });

        // Close lightbox with Escape key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeLightbox();
            }
        });