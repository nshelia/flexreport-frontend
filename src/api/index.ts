import axios, { AxiosInstance } from 'axios';

class MongoClient {
  service: AxiosInstance;

  constructor() {
    this.service = this.createAxiosInstance('https://flex-report.azurewebsites.net/api/');
  }
  createAxiosInstance(baseURL: string): AxiosInstance {
    const instance = axios.create({
      baseURL,
    });

    return instance;
  }

  async connect(connectionString: string): Promise<any> {
    const response = await this.service.post('/sync/customer', {
      dbConnectionString: connectionString,
      name: `${window.navigator.userAgent}-=${Date.now()}`,
    });
    return response.data;
  }

  async generateQuery(sessionId: string, prompt: string): Promise<any> {
    const response = await this.service.post('/report', {
      customerId: sessionId,
      prompt,
    });

    return response.data;
  }

  async runQuery({
    page,
    pageSize,
    customerId,
    reportId,
  }: {
    page: number;
    pageSize: number;
    customerId: string;
    reportId: string;
  }) {
    const response = await this.service.post('/report/execute', {
      page,
      pageSize,
      customerId,
      reportId,
    });

    return response.data;
  }
}

export default new MongoClient();
