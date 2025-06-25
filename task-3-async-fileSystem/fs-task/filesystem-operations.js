const fs = require("fs/promises");
const path = require("path");

//  Read and Display File Contents
async function readFileAsync(filename) {
  try {
    const content = await fs.readFile(filename, "utf-8");
    console.log(`\n--- Contents of ${filename} ---\n${content}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`File ${filename} not found.`);
    } else {
      console.error(`Error reading ${filename}:`, error);
    }
  }
}

// Output:
// await readFileAsync('sample.txt')
// Contents:
// Hello World!

// Write Content to File
async function writeFileAsync(filename, content) {
  try {
    await fs.writeFile(filename, content, "utf-8");
    console.log(`Successfully wrote to ${filename}`);
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error);
  }
}

// Output:
// await writeFileAsync('output.txt', 'This is my task submission')
// Successfully wrote to output.txt

//Copy File from Source to Destination
async function copyFileAsync(source, destination) {
  try {
    await fs.access(source);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(source, destination);
    console.log(`Copied ${source} to ${destination}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`Source file ${source} not found.`);
    } else {
      console.error(`Error copying file:`, error);
    }
  }
}

// Output:
// await copyFileAsync('sample.txt', 'backup/sample_backup.txt')
// Copied sample.txt to backup/sample_backup.txt

// Append Content to Existing File
async function appendFileAsync(filename, content) {
  try {
    let before = "";
    try {
      before = await fs.readFile(filename, "utf-8");
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    console.log(`\n--- Before Appending to ${filename} ---\n${before}`);

    await fs.appendFile(filename, content, "utf-8");

    const after = await fs.readFile(filename, "utf-8");
    console.log(`\n--- After Appending to ${filename} ---\n${after}`);
  } catch (error) {
    console.error(`Error appending to ${filename}:`, error);
  }
}

// Output:
// await appendFileAsync('output.txt', '\nAppended line 1\nAppended line 2')

//List Directory Contents
async function listDirectoryAsync(dirPath) {
  try {
    const items = await fs.readdir(dirPath);
    const details = await Promise.all(
      items.map(async (item) => {
        const stat = await fs.stat(path.join(dirPath, item));
        return {
          name: item,
          type: stat.isDirectory() ? "Directory" : "File",
          size: stat.size,
        };
      })
    );

    const sorted = details.sort((a, b) => a.name.localeCompare(b.name));

    console.log(`\n--- Contents of ${dirPath} ---`);
    sorted.forEach((item) => {
      console.log(`${item.name} - ${item.type} - ${item.size} bytes`);
    });
  } catch (error) {
    console.error(`Error listing directory ${dirPath}:`, error);
  }
}

// Output:
// await listDirectoryAsync('.')
// Contents:
// backup - Directory - 4096 bytes
// output.txt - File - 57 bytes
// sample.txt - File - 12 bytes

// Create and Delete Operations

// Create Directory
async function createDirectoryAsync(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Directory ${dirPath} created.`);
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error);
  }
}

// Create File with Content
async function createFileAsync(filename, content) {
  try {
    await fs.writeFile(filename, content, "utf-8");
    console.log(`File ${filename} created with content.`);
  } catch (error) {
    console.error(`Error creating file ${filename}:`, error);
  }
}

// Delete File
async function deleteFileAsync(filename) {
  try {
    await fs.unlink(filename);
    console.log(`File ${filename} deleted.`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`File ${filename} does not exist.`);
    } else {
      console.error(`Error deleting file ${filename}:`, error);
    }
  }
}

// Delete Directory
async function deleteDirectoryAsync(dirPath) {
  try {
    await fs.rmdir(dirPath);
    console.log(`Directory ${dirPath} deleted.`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`Directory ${dirPath} does not exist.`);
    } else if (error.code === "ENOTEMPTY") {
      console.error(`Directory ${dirPath} is not empty.`);
    } else {
      console.error(`Error deleting directory ${dirPath}:`, error);
    }
  }
}

// Test Cases:
// await createDirectoryAsync('temp')
// await createFileAsync('temp/test.txt', 'temporary file')
// await deleteFileAsync('temp/test.txt')
// await deleteDirectoryAsync('temp')

module.exports = {
  readFileAsync,
  writeFileAsync,
  copyFileAsync,
  appendFileAsync,
  listDirectoryAsync,
  createDirectoryAsync,
  createFileAsync,
  deleteFileAsync,
  deleteDirectoryAsync,
};
