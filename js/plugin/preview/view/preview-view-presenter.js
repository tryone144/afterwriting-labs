define(function(require) {

    var BaseSectionViewPresenter = require('aw-bubble/presenter/base-section-view-presenter'),
        pdfmaker = require('utils/pdfmaker');

    var PreviewViewPresenter = BaseSectionViewPresenter.extend({

        activate: function() {
            BaseSectionViewPresenter.activate.call(this);
            // DEBT: preview should be refreshed when script in model changes (and viewer is active) (+)
            // Could be in BaseScriptObserverPresenter/Mixin
            // $create: this.bin dings = Protoplast.utils.bind(this, 'script.content', this.refresh);
            // on activate: this.bindings.start()
            // on deactivate: this.bindings.stop()
            // TODO: refresh on sync editor.synced.add(this.refresh);
            this.refresh();
        },

        deactivate: function() {
            BaseSectionViewPresenter.deactivate.call(this);
            // TODO: stop refreshing when not visible editor.synced.remove(this.refresh);
        },

        refresh: function() {
            setTimeout(function() {
                pdfmaker.get_pdf(function(result) {
                    this.view.pdf = result;
                }.bind(this));
            }.bind(this), 0);
        }

    });

    return PreviewViewPresenter;
});