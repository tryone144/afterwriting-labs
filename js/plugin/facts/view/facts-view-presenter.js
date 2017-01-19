define(function(require) {

    var BaseSectionViewPresenter = require('aw-bubble/presenter/base-section-view-presenter'),
        data = require('modules/data'),
        queries = require('modules/queries'),
        editor = require('plugins/editor'),
        decorator = require('utils/decorator'),
        fhelpers = require('utils/fountain/helpers');

    var FactsViewPresenter = BaseSectionViewPresenter.extend({

        activate: function() {
            BaseSectionViewPresenter.activate.call(this);
            //editor.synced.add(plugin.refresh);
            this.refresh();
        },
        
        deactivate: function() {
            //editor.synced.remove(plugin.refresh);
        },
        
        _facts: null,
        
        refresh: function() {
            this.view.facts = this._generateData();
            this.view.eachSceneOnNewPage = data.config.each_scene_on_new_page;
            this.view.primaryCharacters = this._getCharactersByLevel(1);
            this.view.secondaryCharacters = this._getCharactersByLevel(2);
        },
        
        _generateData: function () {

            var basics = queries.basics.run(data.parsed_stats.lines);
            this._facts = basics;
            var facts = this._facts;

            facts.title = fhelpers.first_text('title', data.parsed.title_page, '');

            facts.characters = queries.characters.run(data.parsed_stats.tokens, basics, {sort_by: 'lines'});
            facts.locations = queries.locations.run(data.parsed_stats.tokens);
            
            return facts;
        },

        _getCharactersByLevel: function(level) {
            return this._facts.characters.filter(function(character){
                return character.level === level;
            });
        }
        
    });

    return FactsViewPresenter;
});