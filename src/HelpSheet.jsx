import React, { memo } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaClipboard } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { toast } from './util';
import { primaryColor } from './colors';

const electron = window.require('electron');
const { clipboard } = electron;

const { homepage } = electron.remote.require('./constants');

const HelpSheet = memo(({
  visible, onTogglePress, ffmpegCommandLog,
}) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="help-sheet"
        >
          <IoIosCloseCircleOutline role="button" onClick={onTogglePress} size={30} style={{ position: 'fixed', right: 0, top: 0, padding: 20 }} />

          <p style={{ fontWeight: 'bold' }}>
            For usage help and issues, go to<br />
            <span style={{ color: primaryColor, cursor: 'pointer' }} role="button" onClick={() => electron.shell.openExternal(homepage)}>{homepage}</span>
          </p>
          <h1>{t('Keyboard & mouse shortcuts')}</h1>
          <div><kbd>H</kbd> {t('Show/hide this screen')}</div>

          <h2>{t('Playback')}</h2>

          <div><kbd>SPACE</kbd>, <kbd>k</kbd> {t('Play/pause')}</div>
          <div><kbd>J</kbd> {t('Slow down playback')}</div>
          <div><kbd>L</kbd> {t('Speed up playback')}</div>

          <h2>{t('Seeking')}</h2>

          <div><kbd>,</kbd> {t('Step backward 1 frame')}</div>
          <div><kbd>.</kbd> {t('Step forward 1 frame')}</div>
          <div><kbd>ALT</kbd> / <kbd>OPT</kbd> + <kbd>←</kbd> {t('Seek to previous keyframe')}</div>
          <div><kbd>ALT</kbd> / <kbd>OPT</kbd> + <kbd>→</kbd> {t('Seek to next keyframe')}</div>
          <div><kbd>←</kbd> {t('Seek backward 1 sec')}</div>
          <div><kbd>→</kbd> {t('Seek forward 1 sec')}</div>
          <div><kbd>CTRL</kbd> / <kbd>CMD</kbd> + <kbd>←</kbd> {t('Seek backward 1% of timeline at current zoom')}</div>
          <div><kbd>CTRL</kbd> / <kbd>CMD</kbd> + <kbd>→</kbd> {t('Seek forward 1% of timeline at current zoom')}</div>

          <h2>{t('Timeline/zoom operations')}</h2>
          <div><kbd>Z</kbd> {t('Toggle zoom between 1x and a calculated comfortable zoom level')}</div>
          <div><kbd>CTRL</kbd> / <kbd>CMD</kbd> + <kbd>↑</kbd> {t('Zoom in timeline')}</div>
          <div><kbd>CTRL</kbd> / <kbd>CMD</kbd> + <kbd>↓</kbd> {t('Zoom out timeline')}</div>
          <div><kbd>CTRL</kbd> <i>+ {t('Mouse scroll/wheel up/down')}</i> - {t('Zoom in/out timeline')}</div>
          <div><i>{t('Mouse scroll/wheel left/right')}</i> - {t('Pan timeline')}</div>

          <h2>{t('Segments and cut points')}</h2>
          <div><kbd>I</kbd> {t('Mark in / cut start point for current segment')}</div>
          <div><kbd>O</kbd> {t('Mark out / cut end point for current segment')}</div>
          <div><kbd>+</kbd> {t('Add cut segment')}</div>
          <div><kbd>BACKSPACE</kbd> {t('Remove current segment')}</div>
          <div><kbd>↑</kbd> {t('Select previous segment')}</div>
          <div><kbd>↓</kbd> {t('Select next segment')}</div>

          <h2>{t('File system actions')}</h2>
          <div><kbd>E</kbd> {t('Export segment(s)')}</div>
          <div><kbd>C</kbd> {t('Capture snapshot')}</div>
          <div><kbd>D</kbd> {t('Delete source file')}</div>

          <p style={{ fontWeight: 'bold' }}>{t('Hover mouse over buttons in the main interface to see which function they have')}</p>

          <h1 style={{ marginTop: 40 }}>{t('Last ffmpeg commands')}</h1>
          {ffmpegCommandLog.length > 0 ? (
            <div style={{ overflowY: 'scroll', height: 200 }}>
              {ffmpegCommandLog.reverse().map(({ command }, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} style={{ whiteSpace: 'pre', margin: '5px 0' }}>
                  <FaClipboard style={{ cursor: 'pointer' }} title={t('Copy to clipboard')} onClick={() => { clipboard.writeText(command); toast.fire({ timer: 2000, icon: 'success', title: t('Copied to clipboard') }); }} /> {command}
                </div>
              ))}
            </div>
          ) : (
            <p>{t('The last executed ffmpeg commands will show up here after you run operations. You can copy them to clipboard and modify them to your needs before running on your command line.')}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default HelpSheet;
