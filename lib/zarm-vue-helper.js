'use babel';

import ZarmVueHelperView from './zarm-vue-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  zarmVueHelperView: null,
  subscriptions: null,

  activate(state) {
    this.zarmVueHelperView = new ZarmVueHelperView(state.zarmVueHelperViewState);
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'zarm-vue-helper:toggle': () => this.toggle()
    }));

  },

  deactivate() {
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
  }

};
