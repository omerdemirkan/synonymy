# Synonymy.app
A program that detects overused words in essays and recommends synonyms.

[See it Live!](https://synonymy-app.herokuapp.com/)

## How to use it
Paste your near-final draft essay into the text field and click CHECK.
The top ten offenders will be shown ranked from most to least overused.
Click on one of the words in the sidebar to see their synonyms and all instances of that word in your essay.
If the synonyms for one word aren't helpful, click IGNORE and you wont see it again.

## How it works
1. Search through the user's essay and finds a list of non-stop words used more than twice.

2. Check that this list of words are valid, remove ones that can't be found in a dictionary

3. Look for the word in a list of words ranked from most to least used. Estimate the expected use of that word in day-to-day language from its ranking in the list.

4. Compare the users ratio (number of instances a word is found / total word count) to this expected use ratio to come up with a **score**.

5. Sort the words by their scores, rank order them and display the ten most overused.

6. Find the synonyms to these words.

Synonymy relies on a list of 97,565 unique words used in over 743 billion different places ranked from most to least used collected by Peter Norvig from data provided by Google Books.
Because the use of words follows a Zipf distribution, the word's occurence in day to day language can be estimated with surprising accuracy with a simple formula:

(occurence of the most used word) / (the word's ranking the the list)

Because the most used word in the english language is "the" at 7.14%, we can simplify:

.0714 / rank

# Frequently asked questions

## What dialects are supported?
Currently, Synonymy only supports American English. Other dialects can be checked; however, this may lead to certain words being scored unpredictably or ignored altogether. Users with other dialects are encouraged to take suggestions with a grain of salt.

## Does Synonymy check for spelling?
No. Synonymy is intended to be used with a near-final draft. This means that grammar checks and stylistic editing should be done beforehand. It is most useful as the last step before turning in your essay.

## Why is there a 200-word minimum?
A small sample size of words causes unpredictable results in the search, making it more confusing than helpful.

## Why is it misinterpreting some words?
Synonymy is currently unable to check for the context. If the synonyms for a particular word aren't helpful, feel free to click IGNORE, and you won't see those words until your next visit.
