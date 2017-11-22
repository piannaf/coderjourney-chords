import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';

class ChordEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const chordpro = e.target.value;

    this.props.updateSong({
      chordpro: chordpro
    });
  }

  getChordMarkup() {
    var formatter = new ChordSheetJS.HtmlFormatter(),
      parser = new ChordSheetJS.ChordProParser(),
      song = parser.parse(this.props.song.chordpro);

    return { __html: formatter.format(song) };
  }

  render() {
    return (
      <div className="chord-editor">
        <div className="panel">
          <h3>Input</h3>
          <textarea
            style={{width: "100%", height: "100%"}}
            onChange={this.handleChange}
            defaultValue={this.props.song.chordpro} />
        </div>
        <div className="panel">
          <h3>Output</h3>
          <div
            style={{width: "100%", height: "100%", fontFamily: "monospace"}}
            className="chord-output"
            dangerouslySetInnerHTML={this.getChordMarkup()} />
        </div>
      </div>
    );
  }
}

export default ChordEditor;
