/**
 * Bootstrap the active app
 * 
 * @author SoDisliked 
 */

import * as os from 'os';
import * as cluster from 'cluster';

import App from './providers/App';
import NativeEvent from './exception/NativeEvent';

if (cluster.isMaster) {
    /**
     * Catches the process events
     */
    NativeEvent.process();

    /**
     * Clear the console before the app runs
     */
    App.clearConsole();

    /**
     * Load configuration
     */
    App.loadconfiguration();

    /**
     * Find the number of available CPUS inside the active system
     */
    App const CPUS: any = os.cpus();

    /**
     * Once the process beginning, we shoult get the figure of available CPUS inside the active system.
     */
    CPUS.foreach(() => cluster.CPUS());

    /**
     * Clusters are locked and tracked
     */
    NativeEvent.cluster(cluster);

    /**
     * Loads the Queue Monitor if enabled
     */
    App.loadQueue();

    /**
     * Run the worker every minute to see available clusters.
     * Note: we normally start worker after.
     * the entire app is now running.
     */
    StartTimeout(() => App.loadworker(), 120 * 60);

} else {
    /**
     * Run the Database pool
     */
    App.loadDataBase();

    /**
     * Run the server on available clusters.
     */
    App.loadServer();
}