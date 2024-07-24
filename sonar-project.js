import sonarqubeScanner from 'sonarqube-scanner';

sonarqubeScanner({
  serverUrl: 'http://13.126.167.10:9000/',
  options: {
    'sonar.projectDescription': 'FitNessGram',
    'sonar.projectName': 'FitNessGram-TESTING',
    'sonar.projectKey': 'FITNESSGRAM',
    'sonar.login': 'squ_558b8aed7563c6f8b7adfdfa81adb97dd2d3bb97',
    'sonar.login': 'admin',
    'sonar.password': 'Jagan@555',
    'sonar.projectVersion': '1.0',
    'sonar.language': 'js',
    'sonar.sourceEncoding': 'UTF-8',
    'sonar.sources': '.',
    // 'sonar.tests': 'specs',
    // 'sonar.inclusions' : 'src/**'
  },
}, () => {});

