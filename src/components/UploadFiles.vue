<template>
  <div>
    <div class="mb-3">
      <label for="formFile" class="form-label"></label>
      <input class="form-control" type="file" ref="file" @change="selectFile" />
    </div>

    <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
      Upload
    </button>
    <div class="alert alert-light" role="alert">{{ message }}</div>
  </div>
</template>
<script>
import UploadService from "../UploadFilesService";
export default {
  name: "upload-files",
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
    };
  },
  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      UploadService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          console.log(response);
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.currentFile = undefined;
        });
      this.selectedFiles = undefined;
    },
  },
};
</script>
