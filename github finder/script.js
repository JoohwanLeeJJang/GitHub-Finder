function fetchUserInfo() {
    var userId = document.getElementById('search_bar').value;
    var url1 = 'https://api.github.com/users/' + userId;
    var url2 = 'https://api.github.com/users/' + userId + '/repos';

    fetch(url1)
        .then(response => response.json())
        .then(data => {
            document.getElementById("profile_pic1").src = data.avatar_url;
            document.getElementById("public_repos_count").innerText = data.public_repos;
            document.getElementById("public_gists_count").innerText = data.public_gists;
            document.getElementById('followers_count').innerText = data.followers;
            document.getElementById('following_count').innerText = data.followers;
            document.getElementById("Company").innerText = data.Company;
            document.getElementById("Website").innerText = data.blog;
            document.getElementById('Location').innerText = data.location;
            document.getElementById('Member').innerText = data.created_at;

            fetch(url2)
                .then(response => response.json())
                .then(data => {
                    var reposElements = document.querySelectorAll('.profile_info3');

                    for (var i = 0; i < Math.min(5, data.length); i++) {
                        var repo = data[i];
                        var name = repo.name;
                        var stars = repo.stargazers_count;
                        var watchers = repo.watchers_count;
                        var forks = repo.forks_count;

                        var repoElement = reposElements[i];
                        var repoNameElement = repoElement.querySelector('#repo_name_' + (i+1));
                        var starsElement = repoElement.querySelector('.list-group-item-3-1 span');
                        var watchersElement = repoElement.querySelector('.list-group-item-3-2 span');
                        var forksElement = repoElement.querySelector('.list-group-item-3-3 span');
                        
                        repoNameElement.innerText = name;
                        starsElement.innerText = stars;
                        watchersElement.innerText = watchers;
                        forksElement.innerText =  forks;

                        repoNameElement.addEventListener('click', function() {
                            window.open('https://github.com/' + userId + '/' + name, '_blank');
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}
