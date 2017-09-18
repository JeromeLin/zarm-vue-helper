'use babel';

import ZarmVueHelperView from './zarm-vue-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  zarmVueHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.zarmVueHelperView = new ZarmVueHelperView(state.zarmVueHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.zarmVueHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'zarm-vue-helper:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.zarmVueHelperView.destroy();
  },

  serialize() {
    return {
      zarmVueHelperViewState: this.zarmVueHelperView.serialize()
    };
  },

  toggle() {
    console.log('ZarmVueHelper was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
