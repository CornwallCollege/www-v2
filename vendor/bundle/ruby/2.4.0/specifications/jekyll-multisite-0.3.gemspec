# -*- encoding: utf-8 -*-
# stub: jekyll-multisite 0.3 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-multisite".freeze
  s.version = "0.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sumit Khanna".freeze]
  s.date = "2015-12-14"
  s.description = "Plugin for mult-site Jekyll configurations".freeze
  s.email = "sumit@penguindreams.org".freeze
  s.homepage = "http://penguindreams.org".freeze
  s.licenses = ["GPL-3.0".freeze]
  s.rubygems_version = "2.6.14".freeze
  s.summary = "jekyll-multisite".freeze

  s.installed_by_version = "2.6.14" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.0.1", "~> 3.0"])
    else
      s.add_dependency(%q<jekyll>.freeze, [">= 3.0.1", "~> 3.0"])
    end
  else
    s.add_dependency(%q<jekyll>.freeze, [">= 3.0.1", "~> 3.0"])
  end
end
