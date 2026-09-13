// ===== View navigation =====
const homeView = document.getElementById('homeView');
const galleryView = document.getElementById('galleryView');
const specialDropsView = document.getElementById('specialDropsView');
const bringTheSummerView = document.getElementById('bringTheSummerView');
const petsView = document.getElementById('petsView');
const ticketsView = document.getElementById('ticketsView');
const ticketDetailView = document.getElementById('ticketDetailView');
const stuntsView = document.getElementById('stuntsView');
const fixesView = document.getElementById('fixesView');
const coffersView = document.getElementById('coffersView');
const cofferDetailView = document.getElementById('cofferDetailView');
const modpacksView = document.getElementById('modpacksView');
const modpackDetailView = document.getElementById('modpackDetailView');

let viewTransitionTimer = null;
const scrollPositions = {};

function showView(view) {
    // Prevent rapid-click race conditions
    if (viewTransitionTimer) {
        clearTimeout(viewTransitionTimer);
        viewTransitionTimer = null;
    }

    // Find the currently active view
    const currentView = [homeView, galleryView, specialDropsView, bringTheSummerView, petsView, ticketsView, ticketDetailView, stuntsView, fixesView, coffersView, cofferDetailView, modpacksView, modpackDetailView].find(function (v) {
        return v.classList.contains('active');
    });

    // Save the current scroll position for the view we're leaving
    if (currentView && currentView !== view) {
        scrollPositions[currentView.id] = window.scrollY;
    }

    // If there's a current view and it's not the target, fade it out first
    if (currentView && currentView !== view) {
        currentView.classList.add('closing');
        viewTransitionTimer = setTimeout(function () {
            currentView.classList.remove('active');
            currentView.classList.remove('closing');
            view.classList.add('active');
            viewTransitionTimer = null;
            // Restore the saved scroll position for the target view
            if (scrollPositions[view.id] !== undefined) {
                window.scrollTo(0, scrollPositions[view.id]);
            }
        }, 300);
    } else {
        view.classList.add('active');
        // Restore the saved scroll position for the target view
        if (scrollPositions[view.id] !== undefined) {
            window.scrollTo(0, scrollPositions[view.id]);
        }
    }
}