import { DocumentationModule } from './documentation.module';

describe('DocumentationModule', () => {
  let documentationModule: DocumentationModule;

  beforeEach(() => {
    documentationModule = new DocumentationModule();
  });

  it('should create an instance', () => {
    expect(documentationModule).toBeTruthy();
  });
});
