# ChatLangChain Express Application

## Technical Description

There are two components: training the model and question-answering.

### Training the model

Training has the following steps:

1. Load raw data from .txt file.

2. Split documents with LangChain's [RecursiveCharacterTextSplitter](https://js.langchain.com/docs/modules/data_connection/document_transformers/recursive_text_splitter)

3. Create a vectorstore of embeddings, using LangChain's [Faiss](https://js.langchain.com/docs/integrations/vectorstores/faiss) with OpenAI's embeddings.

### Question-answering

## Running App Locally

1. Clone the repository:

```
git clone https://github.com/kimhuy011199/node-langchain-chatbot
```

2. Install dependencies:

```
npm install
```

3. Set the required environment variables listed inside `.env.sample` file.

4. Set your data to `src/training/training-data.txt` file.

5. Run the training script:

```
npm run train:dev
```

6. Start the development server:

```
npm run dev
```

## Related Documents
