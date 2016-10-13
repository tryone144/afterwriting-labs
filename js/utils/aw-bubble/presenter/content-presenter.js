define(function(require) {

    var Protoplast = require('aw-bubble/vendor/protoplast');

    var ContentPresenter = Protoplast.Object.extend({

        themeModel: {
            inject: 'theme-model'
        },
        
        init: function() {
            this.view.visible = false;
            this.view.hide();

            Protoplast.utils.bind(this, 'themeModel.sections.selected', this.updateContentVisibility.bind(this));
            Protoplast.utils.bind(this, 'themeModel.sections.selected', this.updateContentSize.bind(this));
            Protoplast.utils.bind(this, 'themeModel.height', this.updateContentSize.bind(this));
            Protoplast.utils.bind(this, 'themeModel.width', this.updateContentSize.bind(this));
            Protoplast.utils.bind(this, 'themeModel.expanded', this.updateExpanded.bind(this));
        },

        updateContentVisibility: function() {
            if (this.themeModel.sections.selected) {
                this.view.show(this.themeModel.contentSlideAnimation);
            }
            else {
                this.view.hide(this.themeModel.contentSlideAnimation);
            }
        },

        updateContentSize: function() {
            var left = this.themeModel.small ? 0 : (this.themeModel.width - this.view.outerWidth) / 2;
            var height = this.themeModel.height;
  
            this.view.height = height;
            this.view.left = left;
        },

        updateExpanded: function() {
            this.view.expanded = this.themeModel.expanded;
            this.updateContentSize();
        }

    });

    return ContentPresenter;
});