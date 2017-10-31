import React from 'react';
import { shallow } from 'enzyme';
import ChordEditor from './ChordEditor';

describe('<ChordEditor />', () => {
  it('renders an editor area', () => {
    const editor = shallow(<ChordEditor />);
    expect(editor.find('textarea').length).toEqual(1);
  });

  it('renders an output area', () => {
    const editor = shallow(<ChordEditor />);
    expect(editor.find('div.chord-output').length).toEqual(1);
  });

  it('generates the chord chart output', () => {
    const editor = shallow(<ChordEditor />);
    const expected = 
      '<table>' +
        '<tr>' +
          '<td class="chord"></td>' +
        '</tr>' +
        '<tr>' +
          '<td class="lyrics">Type some lyrics here&nbsp;</td>' +
        '</tr>' +
      '</table>';

    const result = editor.find('div.chord-output').html();

    expect(result.indexOf(expected) > -1).toEqual(true);
  });

  it('regenerates the chord chart output based on the state', () => {
    const editor = shallow(<ChordEditor />);
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
    editor.setState({ value: "[B]New [Am]Lyrics"});

    const result = editor.find('div.chord-output').html();

    expect(result.indexOf(expected) > -1).toEqual(true);
  });
});
