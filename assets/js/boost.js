(function() {
  const ready = () => {
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item) => {
      const header = item.querySelector('.benefit-header');
      if (!header) return;
      header.addEventListener('click', () => {
        item.classList.toggle('is-open');
      });
    });

    const maps = document.querySelectorAll('[data-map]');
    maps.forEach((node) => {
      if (typeof L === 'undefined') return;
      const encodedRegions = node.getAttribute('data-regions');
      let regions = [];
      if (encodedRegions) {
        try {
          regions = JSON.parse(atob(encodedRegions));
        } catch (err) {
          console.warn('Boosst map: unable to parse regions', err);
        }
      }
      if (!regions.length) return;
      const regionMap = {};
      regions.forEach((region) => {
        if (region.key) {
          regionMap[region.key] = region;
        }
      });
      const defaultKey = node.getAttribute('data-default-region') || regions[0].key;
      const zoom = parseFloat(node.getAttribute('data-zoom')) || 5;
      const map = L.map(node, { scrollWheelZoom: false }).setView([39.8283, -98.5795], zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      const markers = [];
      const renderRegion = (key) => {
        const region = regionMap[key];
        if (!region) return;
        markers.forEach((marker) => map.removeLayer(marker));
        markers.length = 0;
        const latLngs = [];
        (region.locations || []).forEach((point) => {
          if (typeof point.lat !== 'number' || typeof point.lng !== 'number') return;
          const marker = L.marker([point.lat, point.lng]).addTo(map);
          if (point.label) {
            marker.bindPopup(`<strong>${point.label}</strong>`);
          }
          markers.push(marker);
          latLngs.push([point.lat, point.lng]);
        });
        if (!latLngs.length) return;
        if (latLngs.length === 1) {
          map.setView(latLngs[0], zoom);
        } else {
          map.fitBounds(L.latLngBounds(latLngs), { padding: [30, 30] });
        }
      };
      const shell = node.closest('.map-shell');
      const buttons = shell ? shell.querySelectorAll('[data-region-trigger]') : [];
      const lists = shell ? shell.querySelectorAll('[data-region-list]') : [];
      const activateRegion = (key) => {
        renderRegion(key);
        buttons.forEach((btn) => {
          const isActive = btn.dataset.regionTrigger === key;
          btn.classList.toggle('is-active', isActive);
          btn.setAttribute('aria-selected', String(isActive));
        });
        lists.forEach((list) => {
          list.classList.toggle('is-hidden', list.dataset.regionList !== key);
        });
      };
      if (buttons.length) {
        buttons.forEach((btn) => {
          btn.addEventListener('click', (event) => {
            event.preventDefault();
            activateRegion(btn.dataset.regionTrigger);
          });
        });
      }
      activateRegion(defaultKey);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
