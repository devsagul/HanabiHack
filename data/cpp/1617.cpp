/*	This file is part of TheBlackHole, which is free software and is licensed
 * under the terms of the GNU GPL v3.0. (see http://www.gnu.org/licenses/ ) */

#include "Directory.hpp"

#include <QDirIterator>
#include <QDebug>
#include <algorithm>

void Directory::update(){
	//TODO: quick-update which reuses already existing dirs/files. Probably only worth doing it on dirs.
	dirs.clear();
	files.clear();
	
	QDirIterator it( directory.filePath(), QDir::AllEntries | QDir::NoDotAndDotDot | QDir::Hidden | QDir::NoSymLinks );
	while( it.hasNext() ){
		it.next();
		auto info = it.fileInfo();
		if( info.isDir() )
			dirs.emplace_back( this, info ); //Note: this is dangerous as the pointer can get invalidated!
		else
			files.emplace_back( this, info );
	}
	
	for( auto& dir : dirs )
		dir.update();
}

template<typename T, typename Func>
auto sumObj( std::vector<T>& vec, Func f ){
	auto addFunc = [](auto func)
		{ return [&](auto acc,auto& object){ return acc + func(object); }; };
	return std::accumulate( vec.begin(), vec.end(), (int64_t)0, addFunc(f) );
}

int64_t Directory::getTotalSize(){
	return total_size.get( [&](){
			auto adder = []( auto& obj ){ return obj.getTotalSize(); };
			return sumObj( dirs, adder ) + sumObj( files, adder );
		} );
}

int64_t Directory::filesCount(){
	auto getFileCount = [](auto& obj){ return obj.filesCount(); };
	return sumObj( dirs, getFileCount ) + sumObj( files, getFileCount );
}


int64_t Directory::directoriesCount(){
	auto getDirCount = [](auto& obj){ return obj.directoriesCount(); };
	return 1 + sumObj( dirs, getDirCount ) + sumObj( files, getDirCount );
}

AFileItem& Directory::getChild( int index ){
	if( index < dirs.size() )
		return dirs[index];
	
	index -= dirs.size();
	if( index < files.size() )
		return files[index];
	
	//TODO: throw
}
