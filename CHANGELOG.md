# Changelog

## 2020-11-02

### Added

- When the plugin starts it will send a call to the Remix compiler with command 'getCompilationResult'
If the command fails the compiler is not active and the user is prompted to activate it. They can check again
after changing the settings.

### changes

- Date structure of the date modified
- Sorting the workshops is not done by the Git API on name and or ID
- scrolling issues

## 2020-09-27

### Added

- Functions to call the plugin from the IDE

    ### Add a repository:

    ```
    addRepository(repoName, branch)
    ```

    ### Start a tutorial
    
    ```
    startTutorial(repoName,branch,id)
    ```

    You don't need to add a seperate addRepository before calling startTutorial, this call will also add the repo.

    *Parameters*
    
    id: this can be two things:
    - type of number, it specifies the n-th tutorial in the list
    - type of string, this refers to the ID parameter in the config.yml file in the tutorial
    for example:

    ```
    --- 
    id: basics
    name: 1 Basics of Solidity
    summary: Some basic functions explained
    level: 4
    tags: 
        - solidity
    ```


    ### How to call these functions in the REMIX IDE

    ```
    (function ()  {
    try {
        // You don't need to add a seperate addRepository before calling startTutorial, this is just an example
        remix.call('LearnEth', 'addRepository', "ethereum/remix-workshops", "master")
        remix.call('LearnEth', 'startTutorial', "ethereum/remix-workshops", "master", "basics")
        remix.call('LearnEth', 'startTutorial', "ethereum/remix-workshops", "master", 2)
    } catch (e) {
       console.log(e.message)
    }
    })()
    ```
    
    Then call this in the REMIX console
    
    ```
    remix.exeCurrent()
    ```

### Changed
- The answer file will always be shown, even if there is no test file.
- Importing repositories has been refactored to reduce the amount of files being loaded. Most of the basic data is now supplied through the API. Only the steps are loaded seperately.
