/**
 * @fileoverview Vue component for displaying a place card in the itinerary.
 * Supports viewing, editing, deleting, and reordering places.
 */

(function placeCardComponent() {
  const RC = window.RouteCraft;

  window.PlaceCard = {
    template: '#place-card-template',
    props: {
      /** @type {Stop} */
      stop: Object,
      /** @type {Stop|null} */
      nextStop: {
        type: Object,
        default: null
      },
      /** @type {number} */
      index: Number,
      /** @type {number} */
      activeIndex: Number,
      /** @type {boolean} */
      isGloballyActive: Boolean,
      /** @type {number|string} */
      editingStopId: [Number, String],
      /** @type {Object} */
      editForm: Object,
      /** @type {string[]} */
      routeColors: Array
    },
    components: {
      'place-search': window.PlaceSearch
    },
    emits: [
      'fly-to-stop',
      'set-segment-mode',
      'start-edit',
      'delete-stop',
      'save-edit',
      'cancel-edit',
      'select-edit-suggestion'
    ],
    methods: {
      /**
       * Opens Google Maps directions to the next stop, or a search for this stop.
       */
      openDirections() {
        const stops = [this.stop];
        if (this.nextStop) {
          stops.push(this.nextStop);
        }
        const url = RC.generateGmapsUrl(stops);
        window.open(url, '_blank');
      },
      /**
       * Gets the color assigned to the route segment leading to this place.
       * @param {number} index - The index of the place within its day.
       * @returns {string} Hex color string.
       */
      getRouteColor(index) {
        return this.routeColors[index % this.routeColors.length];
      },
      /**
       * Generates a style object for the place number badge.
       * @param {number} index - The index of the place within its day.
       * @returns {Object} CSS style object.
       */
      getBadgeStyle(index) {
        const color = this.getRouteColor(index);
        return {
          backgroundColor: `${color}1A`, // 10% opacity
          color,
          border: `1px solid ${color}55` // 33% opacity
        };
      }
    }
  };
})();
