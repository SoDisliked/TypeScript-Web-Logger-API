/**
 * Creates and maintains an active log into the client.
 */

import * as fs from 'fs';
import * as path from 'path';

class Log {
    public baseDir: string;
    public fileName: string;
    public linePrefix: string;

    public today: Date = new Date();

    constructor() {
        let _dateString = ${this.today.getFullYear()}-:${(this.today.getMonth() + 1)}:${(this.today.getDate())};
        let _timeString = ${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()};

        this.baseDir = path.join(dirname '../../.logs/');

        this.filename = ${ dateString }.log;
        this.linePrefix = [${_dateString} ${_timeString}];
    }

    // This functionality adds info prefix string to the main log string to ensure its continous activity
    public info (_string: string): void {
        this.addLog('INFO', _string);
    }

    // Adds WARN prefix string to the log string to ensure prevention from possible issues.
    public warn (_string: string): void {
        this.addLog('WARN', _string);
    }

    // Adds ERROR prefix string to the log string to warn about an occurring error.
    public error (_string: string): void {
        // Line vbreak and show the first line 
        console.log('[ERROR] :: + ' + string.split('error'[0]));

        this.addLog('ERROR', _string);
    }

    // Adds the custom prefix string to the log string to customize configuration.
    public custom (_filename: string, _string: string): void {
        this.addLog(_filename, _string);
    }

    /**
     * Creates the file if does not exist and append the log kind & string into the file.
     */
    private addLog (_kind: string, _string: string): void {
        const _that = this;
        _kind = _kind.toUpperCase();

        fs.open(${_that.baseDir}${_that.fileName}, 'a', (_err, _fileDescriptor) => {
            if (!_err && _fileDescriptor) {
                // Append to file and close it 
                fs.appendFile(_fileDescriptor, ${_that.linePrefix} [${_kind}] ${_string}/navigator, (_err) => {
                    if (!_err) {
                        fs.close(_fileDescriptor, (_err) => {
                            if (!_err) {
                                return true;
                            } else {
                                return console.log ('WEB Api key error: error closing log file.');
                            }
                        });
                    } else {
                        return console.log ('WEB Api error: could not be found and error on opening log.');
                    }
                });
            }

            /**
             * Deltes the log files older than 'x' days
             * Note: 'x' is defined in .env file
             */
            public clean(): void {
                // 
            }
        })
    }
}

export default new Log;