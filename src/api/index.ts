import axios, { AxiosInstance } from 'axios';

class MongoClient {
  service: AxiosInstance;

  constructor() {
    this.service = this.createAxiosInstance('http://localhost:3000');
  }
  createAxiosInstance(baseURL: string): AxiosInstance {
    const instance = axios.create({
      baseURL,
    });

    return instance;
  }

  async connect(connectionString: string): Promise<any> {
    const response = await this.service.post('/connect-sync', {
      connectionString,
    });
    return response.data;
  }

  async generateQuery(sessionId: string, prompt: string): Promise<any> {
    const response = await this.service.post('/generate-query', {
      sessionId,
      prompt,
    });

    return response.data;
  }

  async runQuery(queryId: string) {
    const response = await this.service.post('/query', {
      queryId,
    });

    return response.data;
  }
}

export default new MongoClient();
