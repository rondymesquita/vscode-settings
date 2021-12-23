
function get(resource) {
	return new Promise((resolve, reject) => {
		fetch(resource)
		.then(response => response.json())
		.then(data => resolve(data))
		.catch((err) => reject(err))
	})
}

window.onload = async function () {

		const extensions = await get('./extensions.json')
		console.log(extensions);

		const extensionsInfo = await get('./result.json')
		const out = document.querySelector('#code')
		const extensionsEl = document.querySelector('#extensions')
		document.body.appendChild(out)

		for (let index = 0; index < extensionsInfo.length; index++) {
			const extensionInfo = extensionsInfo[index];

			const extensionName = extensions[index]
			// document.write(extensions.name)

			let extension, icon, name, namespace, version, displayName, description, repository;

			if (!extensionInfo.extensions[0]) {
				description = ''
				name = ''
				namespace = ''
				version = ''
				displayName = extensionName
				description = ''
				repository = ''
				icon = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Bang_icon_32x32.svg'
			} else {
				extension = extensionInfo.extensions[0]
				name = extension.name
				namespace = extension.namespace
				version = extension.version
				displayName = extension.displayName
				description = extension.description
				repository = extension.repository
				icon = extension.files.icon
			}

			const extensionEl = document.createElement('div')
			extensionEl.classList.add('extension')

			const iconEl = document.createElement('img')
			iconEl.classList.add('icon')
			iconEl.src = icon

			const descriptionEl = document.createElement('div')
			descriptionEl.classList.add('description')

			const infoEl = document.createElement('div')
			infoEl.classList.add('description-info')
			const descriptionFormated = description ? ` - ${description}` : ''
			infoEl.innerText = `${displayName} ${descriptionFormated}`

			const metaEl = document.createElement('div')
			metaEl.classList.add('description-meta')
			const meta = namespace ? `${namespace}.${name} - ${version}` : ''
			metaEl.innerText = `${meta}`

			const repoEl = document.createElement('a')
			repoEl.classList.add('description-link')
			repoEl.innerText = repository
			repoEl.href = repository
			repoEl.target = '_blank'

			descriptionEl.appendChild(infoEl)
			descriptionEl.appendChild(metaEl)
			descriptionEl.appendChild(repoEl)

			extensionEl.appendChild(iconEl)
			extensionEl.appendChild(descriptionEl)

			extensionsEl.appendChild(extensionEl)
		}

}
