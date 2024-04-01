import { OpenAIEmbeddings } from '@langchain/openai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';

export const getRetriever = async () => {
  const faissStoreDirectory = '';
  const vectorStore = await FaissStore.load(
    faissStoreDirectory,
    new OpenAIEmbeddings()
  );

  return vectorStore.asRetriever();
};
