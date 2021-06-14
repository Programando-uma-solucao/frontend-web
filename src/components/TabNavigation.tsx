import { CSSProperties, useEffect, useState } from 'react';
import { useTheme, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import ArticleIcon from '../assets/article.svg';
import ViolenceIcon from '../assets/woman.svg';
import QuestionsAndAnswersIcon from '../assets/question-and-answer.svg';
import DepositionsIcon from '../assets/depositions.svg';
import LoginIcon from '../assets/login.svg';
import { useAuth } from '../hooks/auth';

const TabNavigation = () => {
  const [currentPath, setCurrentPath] = useState('');

  const theme = useTheme();
  const history = useHistory();
  const auth = useAuth();

  useEffect(() => {
    history.listen(location => {
      setCurrentPath(location.pathname);
    });
  }, [history]);

  const navStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    flexShrink: 0,
    padding: '10px',
    background: theme.colors.teal['500'],
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const itemNavStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    textAlign: 'center',
    color: '#fff',
    padding: 5,
    borderRadius: 0,
    background: 'transparent',
  };

  const imgNavStyle: CSSProperties = {
    color: '#fff',
  };

  return (
    <nav style={navStyle}>
      <Button
        type="button"
        onClick={() => history.push('/juridic-articles')}
        style={{
          ...itemNavStyle,
          color: currentPath.includes('juridic-articles')
            ? theme.colors.blue['200']
            : '#fff',
        }}
      >
        <img
          style={imgNavStyle}
          src={ArticleIcon}
          alt="Informações Jurídicas"
        />
        <span>Informações</span>
      </Button>

      <Button
        type="button"
        onClick={() => history.push('/woman-violence')}
        style={{
          ...itemNavStyle,
          color: currentPath.includes('woman-violence')
            ? theme.colors.blue['200']
            : '#fff',
        }}
      >
        <img
          style={imgNavStyle}
          src={ViolenceIcon}
          alt="Violência contra a mulher"
        />
        <span>Violência</span>
      </Button>

      <Button
        type="button"
        onClick={() =>
          auth.user.role === 'LAWYER'
            ? history.push('/lawyer-questions')
            : history.push('/questions')
        }
        disabled={!auth.user}
        style={{
          ...itemNavStyle,
          color: currentPath.includes('questions')
            ? theme.colors.blue['200']
            : '#fff',
        }}
      >
        <img
          src={QuestionsAndAnswersIcon}
          alt="Perguntas e respostas, dúvidas"
        />
        <span>Perguntas</span>
      </Button>

      <Button
        type="button"
        onClick={() => history.push('/depositions')}
        style={{
          ...itemNavStyle,
          color: currentPath.includes('depositions')
            ? theme.colors.blue['200']
            : '#fff',
        }}
      >
        <img style={imgNavStyle} src={DepositionsIcon} alt="Histórias reais" />
        <span>Depoimentos</span>
      </Button>

      {auth.user ? (
        <Button
          type="button"
          onClick={() => {
            auth.logout();
            history.push('/login');
          }}
          style={itemNavStyle}
        >
          <img style={imgNavStyle} src={LoginIcon} alt="Fazer login" />
          <span>Sair</span>
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => history.push('/login')}
          style={{
            ...itemNavStyle,
            color: currentPath.includes('login')
              ? theme.colors.blue['200']
              : '#fff',
          }}
        >
          <img style={imgNavStyle} src={LoginIcon} alt="Fazer login" />
          <span>Entrar</span>
        </Button>
      )}
    </nav>
  );
};

export default TabNavigation;
