// export const URL = 'http://192.168.100.19:8000/';
export const URL = 'http://127.0.0.1:8000/';

export const environment = {
    production: true,
    STORAGE_URL: URL + 'storage/',
    API_URL_AUTHENTICATION: URL + 'api/authentication/',
    API_URL_IGNUG: URL + 'api/ignug/',
    API_URL_ATTENDANCE: URL + 'api/attendance/',
    API_URL_JOB_BOARD: URL + 'api/job_board/',
    API_URL_WEB: URL + 'api/web/',
    API_URL_TEACHER_EVAL: URL + 'api/teacher_eval/',
    API_URL_COMMUNITY: URL + 'api/community/',
    
    CLIENT_ID: '1',
    CLIENT_SECRET: 'ko4OzUU7gqjdeNsom7DhUVc2iRXUvnIEpctnSd8L',
    GRANT_TYPE: 'password',
    
    APP_ACRONYM: 'SIGA-A',
    APP_NAME: 'SISTEMA DE GESTION ACADEMICO Y ADMINISTRATIVO'
};
