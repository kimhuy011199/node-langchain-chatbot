import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import {
  ANSWER_TEMPLATE,
  STANDALONE_QUESTION_TEMPLATE,
} from '../shared/constants';
import { getRetriever } from '../shared/utils/getRetriever';
import { combineDocuments } from '../shared/utils/combineDocuments';
import { formatConversationHistory } from '../shared/utils/formatConversationHistory';
import { ChatInputInterface } from '../shared/interface/ChatInput';

const chat = async (body: ChatInputInterface) => {
  // Get retriever
  const retriever = await getRetriever();

  // Create LLM instance
  const llm = new ChatOpenAI();

  // Create standalone question prompt template
  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    STANDALONE_QUESTION_TEMPLATE
  );

  // Create answer prompt template
  const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

  // Create standalone question chain
  const standaloneQuestionChain = standaloneQuestionPrompt
    .pipe(llm)
    .pipe(new StringOutputParser());

  // Create retriever chain
  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.standalone_question,
    retriever,
    combineDocuments,
  ]);

  // Create answer chain
  const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

  // Create runnable sequence for these tasks
  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.question,
      conversation_history: ({ original_input }) =>
        original_input.conversation_history,
    },
    answerChain,
  ]);

  // Invoke chain to get the raw answer
  // const answer = await chain.invoke({
  //   question: body.question,
  //   conversation_history: formatConversationHistory(body.history),
  // });

  // return answer;

  // Stream the answer
  const stream = await chain.stream({
    question: body.question,
    conversation_history: formatConversationHistory(body.history),
  });

  return stream;
};

const chatService = {
  chat,
};

export default chatService;
