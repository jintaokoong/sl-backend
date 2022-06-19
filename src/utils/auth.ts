import firebase from 'configurations/firebase';

type ExtractTokenReturnData = [Error, null] | [null, string];

const extractToken = (
  authorization: string | undefined,
): ExtractTokenReturnData => {
  if (!authorization) return [new Error('authorization header missing'), null];
  if (!authorization.startsWith('Bearer'))
    return [new Error('malformed authorization header'), null];
  const s = authorization.split(' ');
  if (s.length !== 2)
    return [new Error('malformed authorization header'), null];
  return [null, s[1]];
};

const validateToken = (token: string) => {
  return firebase.auth().verifyIdToken(token);
};

const auth = {
  extractToken,
  validateToken,
};

export default auth;
