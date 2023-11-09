package com.atharva.cassette.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class VideoUploadService {

    private final String FOLDER_PATH = "B:\\SpringBoot\\Cassette-VideoStreaming\\Back End\\src\\main\\resources\\videos\\";

    public String uploadVideo(MultipartFile file, String title) throws IOException {
        String filePath = FOLDER_PATH + title + ".mp4";
        file.transferTo(new File(filePath));

        return "File uploaded successfully: " + filePath;
    }
}
