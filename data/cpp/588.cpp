// same as 6-0-2.cpp

#include <algorithm>
#include <cctype>
#include <iostream>
#include <string>
#include <vector>

bool not_url_char(char c)
{
  // characters, in addition to alphanumerics, that can appear in a URL
  static const std::string url_ch = "~;/?:@=&$-_.+!*'(),";

  // see wheter c can appear in a URL and return the negative
  //
  // OBS. it took me a while to understand this line
  // find(url_ch.begin(), url_ch.end(), c) != url_ch.end()
  //
  // The thing is that the find function returns a pointer to pointing
  // to its second argument in case it does not find what specified in
  // the third argument. With this in mind, if find returns
  // url_ch.end() it means that it didn't find any c
  return !(isalnum(c) || find(url_ch.begin(), url_ch.end(), c) != url_ch.end());
}

std::string::const_iterator url_beg(std::string::const_iterator b, std::string::const_iterator e)
{
  static const std::string sep = "://";

  typedef std::string::const_iterator iter;

  // i marks where the separator was found
  iter i = b;

  while ((i = search(i, e, sep.begin(), sep.end())) != e) {

    // make sure the separator isn't at the beginning or end of the line
    if (i !=b && i + sep.size() != e) {

      // beg marks the beginning of the protocol name
      iter beg = i;
      while (beg != b && isalpha(beg[-1]))
	--beg;

      // is there at least one appropriate character before and after the separator?
      if (beg != i && !not_url_char(i[sep.size()]))
	return beg;
    }

    // the separator we found wasn't part of a URL advance i past this separator
    i += sep.size();
  }
  return e;
}

std::string::const_iterator url_end(std::string::const_iterator b, std::string::const_iterator e)
{
  return find_if(b, e, not_url_char);
}

std::vector<std::string> find_urls(const std::string& s)
{
  std::vector<std::string> ret;
  typedef std::string::const_iterator iter;
  iter b = s.begin(), e = s.end();

  // look through the entire input
  while (b != e) {

    // look for one or more letters followed by ://
    b = url_beg(b, e);

    // if we found it
    if (b != e) {
      // get the rest of the url
      iter after = url_end(b, e);

      // remember the url
      ret.push_back(std::string(b, after));

      // advance b and check for more URLs on this line
      b = after;
    }
  }
  return ret;
}

int main()
{
  std::string s = "chm:///home/luca/zotero not_a_URL http://www.sears.com/search=torx%20plus";

  std::vector<std::string> v;
  v = find_urls(s);

  for (std::vector<std::string>::size_type i = 0; i != v.size(); ++i) {
    std::cout << v[i] << std::endl;
  }

  return 0;
}
