import 'dotenv/config';
import fs from 'fs';
import { OpenAIEmbeddings } from '@langchain/openai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const loadRawData = async () => {
  return fs.readFileSync(
    process.cwd() + '/src/training/training-data.txt',
    'utf8'
  );
};

const splitDataToChunks = async (trainingData: any) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 40,
    chunkSize: 400,
  });
  return await textSplitter.createDocuments([trainingData]);
};

const getEmbeddingsModel = () => {
  return new OpenAIEmbeddings();
};

const trainData = async () => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY must be set in the environment');
    }

    // Load the .txt data
    const textData = await loadRawData();

    // Split loaded data into chunks
    const docs = await splitDataToChunks(textData);

    // Get embedding model
    const embeddings = getEmbeddingsModel();

    // Create vector store
    const vectorStore = await FaissStore.fromDocuments(docs, embeddings);

    // Save vectors to file
    const directory = './';
    await vectorStore.save(directory);

    console.log('Finished!');
  } catch (error) {
    console.error('Failed to train data');
    console.error(error);
    process.exit(1);
  }
};

trainData();
