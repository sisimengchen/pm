import React, { Component } from 'react';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/oceanic-next.css';
import 'codemirror/addon/fold/foldgutter.css';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/markdown/markdown';

import 'codemirror/keymap/sublime';

import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/comment-fold';

export default class ProfessionalCode extends Component {
  static defaultProps = {
    value: '',
    keyMap: 'sublime',
    indentUnit: 2,
    autoCloseBrackets: true,
    matchTags: { bothTags: true },
    foldGutter: true,
    lineNumbers: true,
    lineWrapping: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    styleActiveLine: true
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.codemirror = null;
  }

  getValue() {
    if (this.codemirror) {
      return this.codemirror.getValue();
    } else {
      return '';
    }
  }

  componentDidMount() {
    this.codemirror = new CodeMirror(this.dom, {
      ...this.props,
      theme: 'oceanic-next'
    });
  }

  render() {
    return (
      <div
        className="components-professional-code"
        ref={(ref) => {
          this.dom = ref;
        }}
      />
    );
  }
}
