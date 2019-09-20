/**
 * This is a simple wrapper to serve as the bootstrap of the js app
 */
function init() {
    console.log('Called init():');

    fetchDataset();
    findSmallestValue();
}

/**
 * This function fetches or generates the data and places it within the dataset text field
 */
function fetchDataset(random_amount = 32) {
    console.log('Called fetchDataset():');

    var dataset = [];

    // generate random one
    let marker = Math.floor(Math.random() * 99);
    let checkpoint = Math.floor(Math.random() * 99);
    let checkpoint_crossed = false;
    for (let i = 0; i < random_amount; i++) {
        dataset.push(marker);

        let addition = Math.floor(Math.random() * 12);

        if (checkpoint_crossed === false && marker > checkpoint) {
            marker = marker + (addition * -1);
        } else {
            marker = marker + addition;
        }
    }

    // set dataset
    document.getElementById('dataset').value = dataset;
}

/**
 * This function finds the smallest value using a simple method.
 */
function findSmallestValue() {
    let dataset = document.getElementById('dataset').value.split(',');

    console.log('Called findSmallestValue():');
    console.log('-> array loaded..');
    console.log(dataset);

    let smallest_i = null;
    let loops = 0;
    for (let i = 0; i < dataset.length; i++) {
        if (smallest_i == null || dataset[i] < dataset[smallest_i]) {
            smallest_i = i;
        }
        loops++;
    }

    return returnResults('smallest number found in data: ' + dataset[smallest_i] + ' it required a total of ' + loops + ' iterations');
}

/**
 * For larger datasets this optmized method is intended to cut the total iterations needed to a minimum
 */
function findSmallestValueOptimized() {
    let dataset = document.getElementById('dataset').value.split(',');

    console.log('Called findSmallestValue():');
    console.log('-> array loaded..');
    console.log(dataset);

    // determine which chunk of the array we will check
    let middle = Math.round(dataset.length / 2);
    let chunk_start = null;
    let chunk_end = null;

    if (dataset[0] < dataset[middle] && dataset[0] < dataset[dataset.length - 1]) {
        chunk_start = 0;
        chunk_end = middle;
    } else {
        chunk_start = middle;
        chunk_end = dataset.length;
    }

    console.log('-> using optimized chunk ' + chunk_start + ' to ' + chunk_end);

    let smallest_i = null;
    let loops = 0;
    for (i = chunk_start; i < chunk_end; i++) {
        console.log('-> checking ' + dataset[i]);

        if (smallest_i == null || dataset[i] < dataset[smallest_i]) {
            console.log('---> ' + dataset[i] + ' is the new victor!');
            smallest_i = i;
        }
        loops++;
    }

    return returnResults('smallest number found in data: ' + dataset[smallest_i] + ' it required a total of ' + loops + ' iterations');
}

function returnResults(results) {
    document.getElementById('results').innerHTML = results;
}
