import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { VideoContextProvider } from './store/video-context';
import { TopicContextProvider } from './store/topic-context';
import { TestContextProvider } from './store/test-context';
import { AuthContextProvider } from './store/auth-context';
import { UserContextProvider } from './store/user-context';
import { LanguageContextProvider } from './store/lang-context';

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserContextProvider>
        <LanguageContextProvider>
          <VideoContextProvider>
            <TestContextProvider>
              <TopicContextProvider>
                <App />
              </TopicContextProvider>
            </TestContextProvider>
          </VideoContextProvider>
        </LanguageContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
