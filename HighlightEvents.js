/*:
 * @plugindesc Highlights interactive events on the map for easy identification.
 * @author Me
 *
 * @help
 * This plugin highlights triggerable events on the map, making it easier to
 * identify which events the player can interact with.
 *
 * Installation:
 * Place this script in the "js/plugins" folder of your RPG Maker project and enable it
 * in the Plugin Manager.
 */
(function() {
    const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.call(this);
        this.createHighlights();
    };

	Spriteset_Map.prototype.createHighlights = function() {
		// Remove old highlights
		if (this._highlightSprites) {
			this._highlightSprites.forEach(obj => {
				this.removeChild(obj.sprite);
			});
		}
		this._highlightSprites = [];

		$gameMap.events().forEach(event => {
			if (event.event()) {
				const activePage = event.page();

				if (activePage && this._isPageTriggerable(activePage) && !this._isPageEmpty(activePage)) {
					// Determine highlight color based on presence of Show Picture command
					const hasShowPicture = this._pageHasShowPicture(activePage);
					const sprite = new Sprite();
					sprite.bitmap = new Bitmap(48, 48);

					if (hasShowPicture) {
						sprite.bitmap.fillAll('rgba(0,255,255,0.3)'); // Cyan for "scene" events
					} else {
						sprite.bitmap.fillAll('rgba(255,255,0,0.2)'); // Yellow for regular
					}

					sprite.x = event.screenX() - 24;
					sprite.y = event.screenY() - 48;
					this.addChild(sprite);
					this._highlightSprites.push({sprite, event});
				}
			}
		});
	};


    // Helper function to check if the event page is triggerable
    Spriteset_Map.prototype._isPageTriggerable = function(page) {
        // A page is triggerable if its trigger is one of these values:
        // 0 = Action Button, 1 = Player Touch, 2 = Event Touch
        return page.trigger === 0 || page.trigger === 1 || page.trigger === 2;
    };

    // Helper function to check if the event page has any commands
    Spriteset_Map.prototype._isPageEmpty = function(page) {
        return page.list.length <= 1; // If the page has no commands, it's considered empty
    };
	// Checks if the page contains a "Show Picture" command (code 231)
	Spriteset_Map.prototype._pageHasShowPicture = function(page) {
		return page.list.some(cmd => cmd && cmd.code === 231);
	};
    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        if (this._highlightSprites) {
            this._highlightSprites.forEach(obj => {
                obj.sprite.x = obj.event.screenX() - 24;
                obj.sprite.y = obj.event.screenY() - 48;
            });
        }
    };

    // Hook into map change event to refresh highlights when changing maps
    const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        _Scene_Map_onMapLoaded.call(this);
        this._spriteset.createHighlights(); // Refresh highlights when a new map loads
    };
})();
