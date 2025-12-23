#include <vector>
#include <iostream>
#include <fstream>
#include <filesystem>
#include <unistd.h>
#include <limits.h>
#include <pwd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <time.h>
#include <iomanip>
#include <sstream>

bool exists(const std::string& path){
    return std::filesystem::exists(path);
}

std::vector<std::string> getDirs(const std::string &path) {
	std::vector<std::string> dirs;
    if(!exists(path)){
        std::cerr << "======================= ERROR =======================" << std::endl;
        std::cerr << "filework.cpp: getDirs" << std::endl;
        std::cerr << "path does not exists" << std::endl;
        std::cerr << path << std::endl;
        std::cerr << std::endl;
        return dirs;
    }
	if(!std::filesystem::is_directory(path)){
		std::cerr << "======================= ERROR =======================" << std::endl;
		std::cerr << "filework.cpp: getDirs" << std::endl;
		std::cerr << "path leads to a file, not directory" << std::endl;
		std::cerr << path << std::endl;
        std::cerr << std::endl;
		return dirs;
	}
  std::string back = path;
  while (back.back() != '/')
    {
      back.pop_back();
    }
  back.pop_back();
  dirs = {back};
  for (const std::filesystem::directory_entry &dir : std::filesystem::directory_iterator(path))
    {
      dirs.push_back(dir.path().string());
    }
  return dirs;
}


std::string getName(const std::string& path){
	int index = 0;
	for(int i = path.size() -1; i >= 0; --i){
		if(path[i] == '/'){
			index = i + 1;
			break;
		}
	}
	return std::string(path.begin() + index, path.end());
}

std::string cwd(){
    char cwd0[PATH_MAX];
    if (getcwd(cwd0, sizeof(cwd0)) != nullptr) {
        return cwd0;
    } 
    else {
        std::cerr << "==================== ERROR ====================" << std::endl;
        std::cerr << "====== some error in filework.cpp : std::string cwd() ======";
        std::cerr << std::endl;
        return "";
    }
}

std::string getExt(const std::string& file){
    int index = -1;
    for(int i = file.size()-1; i>=0; --i){
        if(file[i] == '.' && i != 0){
            index = i;
            break;
        }
    }
    if(index != -1)
        return std::string(file.begin() + index + 1,file.end());
    return "";
}

void findFiles(std::vector<std::string>& v, const std::string& path){
	auto dirs = getDirs(path);
	for(int i = 1; i < dirs.size(); ++i){
		std::string ext = getExt(dirs[i]);
		if(ext == "ts" || ext == "css" || ext == "tsx" || ext == "json") v.push_back(dirs[i]);
		if(std::filesystem::is_directory(dirs[i]) && getName(dirs[i]) != "docs"
		 && getName(dirs[i]) != "node_modules" && getName(dirs[i]) != ".git" &&
		 getName(dirs[i]) != "src-tauri") findFiles(v, dirs[i]);
	}
}

int main(){
	std::vector<std::string> paths;
	findFiles(paths, (cwd() + "/electr-frontend"));
	std::ofstream out("./prompt");
	out << "У меня есть несколько файлов:" << std::endl;
	for(int i = 0; i < paths.size(); ++i){
		out << getName(paths[i]) << ':' << std::endl;
		out << "```" << std::endl;
		std::string line;
		std::ifstream f(paths[i]);
		while(std::getline(f, line)) out << line << std::endl;
		f.close();
		out << "```" << std::endl;
		out << std::endl;
	}

	out << "Также у меня есть файл .env:" << std::endl;
	std::string line;
	std::ifstream in("./.env");
	out << "```" << std::endl;
	while(std::getline(in, line)) out << line << std::endl;
	in.close();
	out << "```" << std::endl;
	out << "Еще есть файл docker-compose.yml, где я поднимаю базу данных" << std::endl;

	std::ifstream in2("./docker-compose.yml");
	out << "```" << std::endl;
	while(std::getline(in2, line)) out << line << std::endl;
	in.close();
	out << "```" << std::endl;
	out << "Еще у меня есть Makefile: " << std::endl;
	std::ifstream in3("./Makefile");
	out << "```" << std::endl;
	while(std::getline(in3, line)) out << line << std::endl;
	out << "```" << std::endl;
	in3.close();
	out.close();
	std::string cmd = "tree ./electr-frontend/src >> ./prompt";
	system(cmd.c_str());
	return 0;
}