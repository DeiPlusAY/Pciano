import * as keyboardJS from 'keyboardjs'
import * as MIDI from 'midi.js'
import * as Vue from 'vue'

import { calChord, calNoteMap } from './utils'

export const DELAY = 0
export const VELOCITY = 127
export const CHANNEL = 0

export const app = new Vue({
  el: '#app',
  data: {
    onPressNoteIds: []
  },
  methods: {
    isPressing (noteId) {
      return this.onPressNoteIds.indexOf(noteId) !== -1
    },
    calWhiteNoteId(n: number, octave: number) {
      switch (n) {
        case 0:
          return 1 + octave * 12 - 1
        case 1:
          return 3 + octave * 12 - 1
        case 2:
          return 5 + octave * 12 - 1
        default:
          return 2 * n - 1 + octave * 12
      }
    }
  }
})

// play a note or a chord(an array of note)
function playNote(note: number)
function playNote(note: number[])
function playNote(note: any): void {
  console.log(note)
  if (Array.isArray(note)) {
    // play chord
    app.onPressNoteIds = note
    note.forEach(note => {
      MIDI.noteOn(CHANNEL, note, VELOCITY, DELAY)
    })
  } else {
    app.onPressNoteIds = [].concat(note)
    MIDI.noteOn(CHANNEL, note, VELOCITY, DELAY)
  }
}

export function onsuccess() {
  const C = calChord(['C', 'E', 'G'])
  const Am = calChord(['A', '+C', '+E'])
  const Em = calChord(['E', 'G', 'B'])
  const F = calChord(['F', 'A', '+C'])
  const G = calChord(['G', 'B', '+D'])
  const Am7 = calChord(['A', 'C', 'E', 'G'])
  keyboardJS.bind('c', () => {
    // play C major chord - origin inversion
    playNote(C['0'])
  })

  keyboardJS.bind('c + ctrl', () => {
    // play C major chord - first inversion
    playNote(C['1'])
  })

  keyboardJS.bind('c + shift', () => {
    // play C major chord - second inversion
    playNote(C['2'])
  })

  keyboardJS.bind('c + space', () => {
    playNote(C['-2'])
  })

  keyboardJS.bind('a', () => {
    playNote(Am['0'])
  })

  keyboardJS.bind('a + ctrl', () => {
    playNote(Am['1'])
  })

  keyboardJS.bind('a + shift', () => {
    playNote(Am['2'])
  })

  keyboardJS.bind('a + space', () => {
    playNote(Am['-2'])
  })

  keyboardJS.bind('a + 7', () => {
    playNote(Am7['0'])
  })

  keyboardJS.bind('a + 7 + shift', () => {
    playNote(Am7['-1'])
  })

  keyboardJS.bind('e', () => {
    playNote(Em['0'])
  })

  keyboardJS.bind('e + ctrl', () => {
    playNote(Em['1'])
  })

  keyboardJS.bind('e + shift', () => {
    playNote(Em['2'])
  })

  keyboardJS.bind('e + space', () => {
    playNote(Em['-2'])
  })

  keyboardJS.bind('f', () => {
    playNote(F['0'])
  })

  keyboardJS.bind('f + ctrl', () => {
    playNote(F['1'])
  })

  keyboardJS.bind('f + shif', () => {
    playNote(F['2'])
  })

  keyboardJS.bind('f + space', () => {
    playNote(F['-2'])
  })

  keyboardJS.bind('g', () => {
    playNote(G['0'])
  })

  keyboardJS.bind('g + ctrl', () => {
    playNote(G['1'])
  })

  keyboardJS.bind('g + shift', () => {
    playNote(G['2'])
  })

  keyboardJS.bind('g + space', () => {
    playNote(G['-2'])
  })
}
