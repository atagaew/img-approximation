import { WordAnalysis } from '../interfaces/WordAnalysis';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Word } from '../interfaces/Word';
import { WordCategory } from '../interfaces/WordCategory';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    text: Yup.string().required('Text is required'),
});

interface TextInputProps {
    onStartAnalysis: (data: WordAnalysis) => void;
    initialAnalysisData: WordAnalysis;
}


const TextInput: React.FC<TextInputProps> = ({ onStartAnalysis, initialAnalysisData }) => {
    const extractWordsWithLineNumbers = (text: string): Word[] => {
        const words: Word[] = [];
        const lines = text.split('\n');
        let id = 0;
        lines.forEach((line, lineNumber) => {
            const lineWords = line.split(/\s+/);
            lineWords.forEach((wordText, wordNumber) => {
                wordText = wordText.replace(/^(\P{L}+)|(\P{L}+)$/gu, '');
                words.push(Word.create(id, lineNumber + 1, wordNumber + 1, wordText, WordCategory.Nouns));
                id++;
            });
        });
        return words;
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <section>
                    <h2>Enter text to analyze</h2>
                    <div className="col-md-6">
                        <Formik
                            initialValues={initialAnalysisData}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                const words = extractWordsWithLineNumbers(values.text);
                                onStartAnalysis({ ...values, words });
                            }}
                        >
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="analysisTitle" className="form-label">
                                        Title:
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="analysisTitle"
                                        name="title"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="textArea" className="form-label">
                                        Enter Text:
                                    </label>
                                    <Field
                                        as="textarea"
                                        className="form-control"
                                        id="textArea"
                                        name="text"
                                        rows={5}
                                    />
                                    <ErrorMessage name="text" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Continue
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TextInput;