define(function(require) {

    var $ = require('jquery'),
        p = require('protoplast');

    /**
     * Performs user actions
     */
    var User = p.extend({

        $create: function(browser, dom) {
            this.browser = browser;
            this.dom = dom;
        },

        click: function(selector) {
            // DEBT: decide on error handling convention (+)
            try {
                this.browser.click($(selector).get(0));
            }
            catch (e) {
                if (e === "NodeDoesNotExist") {
                    throw new Error('Cannot click on selector "' + selector + '". Element not found.');
                }
            }
            this.browser.tick(20000);
        },

        back_to_main: function() {
            this.click(this.dom.$background);
        },

        open_plugin: function(name) {
            this.click(this.dom.$plugin(name));
        },

        open_plugin_from_toolbar: function(name) {
            this.click(this.dom.$toolbar(name));
        },
        
        open_local_file: function(name) {
            this.browser.open_local_file(name, $(this.dom.$file_input).get(0));
        },
        
        close_content: function() {
            this.click(this.dom.$close_icon);
        },
        
        click_info_icon: function(section_name) {
            this.click(this.dom.$info_icon(section_name));
        },
        
        click_expand_icon: function() {
            this.click(this.dom.$expand_icon);
        },
        
        click_switch_link: function(section_name) {
            this.click(this.dom.$switch_link(section_name));
        },

        open_file_dialog: function() {
            this.click(this.dom.$open_local);
        },

        open_sample: function(name) {
            this.click(this.dom.$open_sample(name));
        },

        open_from_dropbox: function() {
            this.click(this.dom.$open_dropbox);
        },

        open_from_googledrive: function() {
            this.click(this.dom.$open_googledrive);
        },
        
        open_last_used: function(){
            this.click(this.dom.$open_last_used);
        },
        
        save_fountain_locally: function() {
            this.click(this.dom.$save_fountain_locally);
        },
        
        save_fountain_dropbox: function() {
            this.click(this.dom.$save_fountain_dropbox);
        },
        
        save_fountain_google_drive: function(plugin) {
            this.click(this.dom.$save_fountain_google_drive(plugin));
        },
        
        save_pdf_locally: function() {
            this.click(this.dom.$save_pdf_locally);
        },
        
        save_pdf_dropbox: function() {
            this.click(this.dom.$save_pdf_dropbox);
        },
        
        save_pdf_google_drive: function() {
            this.click(this.dom.$save_pdf_google_drive);
        },

        close_popup: function() {
            this.click(this.dom.$close_popup);
        },
        
        confirm_popup: function() {
            this.click(this.dom.$confirm_popup);
        },

        select_file: function(file) {
            this.click(this.dom.$file_link(file));
        },

        click_button: function(label) {
            this.click(this.dom.$button(label));
        },

        turn_sync_on: function() {
            this.click(this.dom.$sync_button);
            this.click_button('OK');
        },

        turn_sync_off: function() {
            this.click(this.dom.$sync_button);
        },

        turn_auto_save_on: function() {
            this.click(this.dom.$auto_save_button);
        },

        sync_keep_content: function() {
            this.click_button('Keep content');
        },

        sync_reload_content_before_sync: function() {
            this.click_button('Load version before sync');
        },

        set_editor_content: function(content) {
            $('.CodeMirror').get(0).CodeMirror.setValue(content);
        },

        select_night_mode: function() {
           this.click(this.dom.$night_mode);
        },

        create_new: function() {
            this.click(this.dom.$create_new);
        },

        create_new_script: function(text) {
            this.open_plugin('open');
            this.create_new();
            this.open_plugin('editor');
            this.set_editor_content(text);
        },

        click_on_page_stats: function() {
            this.click(this.dom.$stats.$page_balance.$page);
        },
        
        download_offline_app: function() {
            this.dom.clean_href(this.dom.$info.$download_link);
            this.click(this.dom.$info.$download_link);
        }

    });

    return User;
    
});