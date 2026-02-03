import type { ReactElement } from 'react';

import electronLogo from './assets/electron.svg';
import UserTest from './components/UserTest';
import Versions from './components/Versions';

export default function App(): ReactElement {
  const hello = async (): Promise<void> => {
    // window.electron.ipcRenderer.send('app.getUser')
    const res: string = (await window.electron.ipcRenderer.invoke(
      'app/hello',
    )) as string;
    console.log(res);
  };

  const prompt = (): void => {
    void window.electron.ipcRenderer.send('app/prompt', 'Prompt Test!');
  };

  const maximize = (): void => {
    void window.electron.ipcRenderer.send('app/maximize');
  };

  const unmaximize = (): void => {
    void window.electron.ipcRenderer.send('app/unmaximize');
  };

  const minimize = (): void => {
    void window.electron.ipcRenderer.send('app/minimize');
  };

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <button className="action" onClick={() => void hello()}>
          Hello
        </button>
        <button className="action" onClick={prompt}>
          Prompt
        </button>
        <button className="action" onClick={maximize}>
          Maximize
        </button>
        <button className="action" onClick={unmaximize}>
          Unmaximize
        </button>
        <button className="action" onClick={minimize}>
          Minimize
        </button>
      </div>
      <UserTest />
      <Versions></Versions>
    </>
  );
}
