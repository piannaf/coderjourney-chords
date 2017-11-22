import React from 'react';
import { shallow } from 'enzyme';
import ChordEditor from './ChordEditor';

describe('<ChordEditor />', () => {
  it('renders an editor area', () => {
    const editor = shallow(<ChordEditor song={{chordpro: ""}}/>);
    expect(editor.find('textarea').length).toEqual(1);
  });

  it('renders an output area', () => {
    const editor = shallow(<ChordEditor song={{chordpro: ""}}/>);
    expect(editor.find('div.chord-output').length).toEqual(1);
  });

  it('generates the chord chart output based on the prop', () => {
    const editor = shallow(<ChordEditor song={{chordpro: '[B]New [Am]Lyrics'}}/>);
    const expected =
      '<table>' +
        '<tr>' +
          '<td class="chord">B</td>' +
          '<td class="chord">Am</td>' +
        '</tr>' +
        '<tr>' +
          '<td class="lyrics">New&nbsp;</td>' +
          '<td class="lyrics">Lyrics&nbsp;</td>' +
        '</tr>' +
      '</table>';

    const result = editor.find('div.chord-output').html();

    expect(result.indexOf(expected) > -1).toEqual(true);
  });

  it('calls updateSong when the textarea changes', () => {
    var theSong
    const update = (song) => {
      theSong = song;
    };

    const editor = shallow(<ChordEditor song={{chordpro: '[B]New [Am]Lyrics'}} updateSong={update}/>);

    editor.find('textarea').simulate('change', {target: {value: '[B]New [Am]Lyrics'}});

    expect(theSong).toEqual({chordpro: '[B]New [Am]Lyrics'});
  });
});
