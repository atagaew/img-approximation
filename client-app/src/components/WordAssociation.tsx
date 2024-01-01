import React, {useEffect, useRef, useState} from "react";
import {Word} from "../interfaces/Word";
import Dropdown from "react-bootstrap/Dropdown";
import WordCategorySelector from "./Shared/WordCategorySelector";
import {WordCategory} from "../interfaces/WordCategory"
import { Modal, Button } from 'react-bootstrap';

const WordAssociation: React.FC<{
    word: Word;
    allWords: Word[];
    onAssociationSelected: (sourceWord: Word, targetWord: Word) => void;
    onWordCategorySelected: (word: Word, WordCategory: WordCategory) => void;
    onRenameWord: (word: Word, newName: string) => void;
}> = ({word, allWords, onAssociationSelected, onWordCategorySelected, onRenameWord}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(word.value);
    const inputRef = useRef<HTMLInputElement>(null);
    const sortedWords = [...allWords].sort((a, b) => a.value.localeCompare(b.value)).filter(w => w.category === word.category);

    const wordTitle = (word: Word | null | undefined, defaultValue?: string): React.ReactNode => {
        return (<>{word?.value} <sub>({word?.lineNumber},{word?.wordNumber})</sub> - {word?.weight}</>);
    };

    const handleRenameClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSaveNewName = (word: Word, newName: string) => {
        onRenameWord(word, newName);
        setShowModal(false);
    };
    
    useEffect(() => {
        if (showModal) {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(newName.length, newName.length);
        }
    }, [showModal, newName]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, word: Word, newName: string) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSaveNewName(word, newName);
        }
    };
    
    return (
        <li className="d-flex justify-content-between align-items-center">
            <div>
                <span>{wordTitle(word)}</span>&nbsp;
                <span
                    className="bi bi-pencil ml-2"
                    onClick={handleRenameClick}
                    style={{cursor: 'pointer'}}
                ></span>
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename Word</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="newName">New Name:</label>
                        <input
                            type="text"
                            id="newName"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, word, newName)}
                            ref={inputRef}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSaveNewName(word, newName)}>
                            Rename
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <span>&rarr;</span>
            </div>

            <div>
                <Dropdown onSelect={(selectedKey: string | null | undefined) => {
                    if (selectedKey) {
                        const selectedObj = JSON.parse(selectedKey);
                        const selectedWordId = selectedObj.id;

                        const selectedWord = sortedWords.find((word) => word.id === selectedWordId);
                        if (selectedWord) {
                            onAssociationSelected(word, selectedWord);
                        } else {
                            console.error('Selected word not found!');
                        }
                    }
                }}>
                    <Dropdown.Toggle variant="secondary" id="dropdown2">
                        {word.associatedWordId ? wordTitle(allWords.find(associatedWord => associatedWord.id === word.associatedWordId), '') : wordTitle(word, '')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {sortedWords.map(word => (
                            <Dropdown.Item key={word.id} eventKey={JSON.stringify({value: word.value, id: word.id})}>
                                {wordTitle(word, '')}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                <WordCategorySelector onWordCategorySelected={(category) => {
                    onWordCategorySelected(word, category)
                }} category={word.category}/>
            </div>
        </li>

    )
}
export default WordAssociation;