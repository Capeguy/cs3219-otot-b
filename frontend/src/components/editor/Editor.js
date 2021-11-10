import React, { useEffect } from 'react'
import './Editor.css'
import PropTypes from 'prop-types'

const Editor = ({ sessionId }) => {
  useEffect(() => {
    // Initialize Firebase.
    // TODO: replace with your Firebase project configuration.
    var config = {
      apiKey: 'AIzaSyDAcyBjJwjnGKcHZ_aBK4wxqhveE6JGmYQ',
      authDomain: 'editor-4404a.firebaseapp.com',
      databaseURL: 'https://editor-4404a-default-rtdb.firebaseio.com/',
    }

    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(config)
    }

    //// Get Firebase Database reference.
    var firepadRef = getRef(sessionId)
    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = window.CodeMirror(document.getElementById('firepad-container'), {
      lineNumbers: true,
      lineWrapping: true,
    })
    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextToolbar: true,
      richTextShortcuts: true,
    })

    //// Initialize contents.
    firepad.on('ready', function () {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml(
          '<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n',
        )
      }
    })
  }, [])

  // Helper to get hash from end of URL or generate a random one.
  const getRef = (hash) => {
    var ref = window.firebase.database().ref()
    ref = ref.child(hash)
    return ref
  }

  return <div id="firepad-container" />
}

Editor.propTypes = {
  sessionId: PropTypes.string,
}

export default Editor
